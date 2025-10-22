import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { YouTubeVideo, formatPublishedDate } from '../services/youtubeApi';

interface VideoCardProps {
  video: YouTubeVideo;
  onHover?: (video: YouTubeVideo | null, event?: any) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (event: any) => {
    setIsHovered(true);
    // Use timeout to mimic YouTube's delayed popup behavior
    setTimeout(() => {
      onHover?.(video, event);
    }, 500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(null);
  };

  return (
    <Pressable
      style={[styles.container, isHovered && styles.containerHovered]}
      onHoverIn={handleMouseEnter}
      onHoverOut={handleMouseLeave}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: video.snippet.thumbnails.medium.url }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.videoInfo}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={2}>
            {video.snippet.title}
          </Text>
          
          <Text style={styles.channelTitle} numberOfLines={1}>
            {video.snippet.channelTitle}
          </Text>
          
          <Text style={styles.publishDate}>
            {formatPublishedDate(video.snippet.publishedAt)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginBottom: 40,
    width: '100%',
    cursor: 'pointer',
  },
  containerHovered: {
    // Subtle hover effect
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  videoInfo: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingHorizontal: 0,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
    marginRight: 12,
    flexShrink: 0,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f0f0f',
    lineHeight: 22,
    marginBottom: 4,
  },
  channelTitle: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 4,
  },
  publishDate: {
    fontSize: 14,
    color: '#606060',
  },
});

export default VideoCard;