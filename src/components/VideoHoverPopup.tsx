import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, Pressable } from 'react-native';
import { YouTubeVideo, formatPublishedDate } from '../services/youtubeApi';

interface VideoHoverPopupProps {
  video: YouTubeVideo | null;
  position: { x: number; y: number } | null;
}

const VideoHoverPopup: React.FC<VideoHoverPopupProps> = ({ video, position }) => {
  const [opacity] = useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (video && position) {
      setIsVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
      });
    }
  }, [video, position, opacity]);

  if (!isVisible || !video || !position) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.popup,
        {
          opacity,
          left: position.x,
          top: position.y,
        },
      ]}
    >
      <View style={styles.popupContent}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: video.snippet.thumbnails.high.url }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.actionsContainer}>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionIcon}>🕒</Text>
            <Text style={styles.actionText}>WATCH LATER</Text>
          </Pressable>
          
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionText}>ADD TO QUEUE</Text>
          </Pressable>
        </View>
        
        <View style={styles.videoInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {video.snippet.title}
          </Text>
          
          <Text style={styles.channelTitle} numberOfLines={1}>
            {video.snippet.channelTitle}
          </Text>
          
          <Text style={styles.viewsAndDate}>
            {formatPublishedDate(video.snippet.publishedAt)}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 12,
    width: 320,
    maxWidth: '90vw',
  },
  popupContent: {
    padding: 0,
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 14,
    color: '#606060',
  },
  actionText: {
    fontSize: 12,
    color: '#0f0f0f',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  videoInfo: {
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f0f0f',
    lineHeight: 20,
    marginBottom: 4,
  },
  channelTitle: {
    fontSize: 12,
    color: '#606060',
    marginBottom: 2,
  },
  viewsAndDate: {
    fontSize: 12,
    color: '#606060',
  },
});

export default VideoHoverPopup;