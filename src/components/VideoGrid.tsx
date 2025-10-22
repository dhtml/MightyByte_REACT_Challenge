import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, Dimensions } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { searchVideos, YouTubeVideo } from '../services/youtubeApi';
import VideoCard from './VideoCard';
import VideoHoverPopup from './VideoHoverPopup';

const VideoGrid: React.FC = () => {
  const [hoveredVideo, setHoveredVideo] = useState<YouTubeVideo | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [columns, setColumns] = useState(4);
  const scrollViewRef = useRef<ScrollView>(null);

  // Calculate number of columns based on available width
  useEffect(() => {
    const updateColumns = () => {
      const screenWidth = Dimensions.get('window').width;
      // Account for sidebar width on larger screens
      const availableWidth = screenWidth > 768 ? screenWidth - 240 : screenWidth;
      
      if (availableWidth < 500) {
        setColumns(1);
      } else if (availableWidth < 800) {
        setColumns(2);
      } else if (availableWidth < 1100) {
        setColumns(3);
      } else if (availableWidth < 1400) {
        setColumns(4);
      } else {
        setColumns(5);
      }
    };

    updateColumns();
    const subscription = Dimensions.addEventListener('change', updateColumns);
    return () => subscription?.remove();
  }, []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery(
    'youtube-videos',
    ({ pageParam }) => searchVideos('programming', 20, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const handleVideoHover = useCallback((video: YouTubeVideo | null, event?: any) => {
    if (video) {
      // Calculate popup position to appear near the video card
      const screenWidth = Dimensions.get('window').width;
      const popupWidth = 320;
      
      // Try to position popup to the right of the hovered card, but keep it on screen
      let x = 400; // Default offset from left
      let y = 200; // Default offset from top
      
      // Ensure popup doesn't go off the right edge
      if (x + popupWidth > screenWidth) {
        x = screenWidth - popupWidth - 20;
      }
      
      setHoverPosition({ x, y });
      setHoveredVideo(video);
    } else {
      setHoveredVideo(null);
      setHoverPosition(null);
    }
  }, []);

  const handleScroll = useCallback(
    (event: any) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      const isCloseToBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 1000;

      if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const renderVideoGrid = () => {
    if (!data) return null;

    const allVideos = data.pages.flatMap(page => page.items);
    const rows = [];
    
    for (let i = 0; i < allVideos.length; i += columns) {
      const rowVideos = allVideos.slice(i, i + columns);
      rows.push(
        <View key={i} style={styles.row}>
          {rowVideos.map((video) => (
            <View key={video.id.videoId} style={[styles.videoWrapper, { width: `${100 / columns}%` }]}>
              <VideoCard
                video={video}
                onHover={(v: YouTubeVideo | null, event?: any) => handleVideoHover(v, event)}
              />
            </View>
          ))}
        </View>
      );
    }
    
    return rows;
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ff0000" />
        <Text style={styles.loadingText}>Loading videos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Failed to load videos. Please check your API key configuration.
        </Text>
        <Text style={styles.errorSubText}>
          Make sure to set REACT_APP_YOUTUBE_API_KEY in your .env file
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {renderVideoGrid()}
        </View>
        
        {isFetchingNextPage && (
          <View style={styles.loadingMore}>
            <ActivityIndicator size="small" color="#ff0000" />
            <Text style={styles.loadingMoreText}>Loading more videos...</Text>
          </View>
        )}
      </ScrollView>
      
      <VideoHoverPopup video={hoveredVideo} position={hoverPosition} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  grid: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 0,
    gap: 16,
  },
  videoWrapper: {
    paddingHorizontal: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loadingMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  loadingMoreText: {
    color: '#666',
    fontSize: 14,
  },
});

export default VideoGrid;