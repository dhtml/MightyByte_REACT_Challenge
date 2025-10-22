import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🧭', label: 'Explore' },
    { icon: '🩳', label: 'Shorts' },
    { icon: '📺', label: 'Subscriptions' },
  ];

  const libraryItems = [
    { icon: '📚', label: 'Library' },
    { icon: '🕒', label: 'History' },
  ];

  return (
    <View style={styles.sidebar}>
      <View style={styles.section}>
        {menuItems.map((item, index) => (
          <Pressable key={index} style={[styles.menuItem, item.active && styles.activeItem]}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={[styles.label, item.active && styles.activeLabel]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.section}>
        {libraryItems.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.signInSection}>
        <Text style={styles.signInPrompt}>Sign in to like videos, comment, and subscribe.</Text>
        <Pressable style={styles.signInButton}>
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        </Pressable>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>BEST OF YOUTUBE</Text>
        {['🎵 Music', '⚽ Sports', '🎮 Gaming', '🎬 Movies', '📰 News'].map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <Text style={styles.label}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    paddingVertical: 8,
    height: '100%',
    flexShrink: 0,
  },
  section: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    cursor: 'pointer',
  },
  activeItem: {
    backgroundColor: '#f2f2f2',
    borderRightWidth: 3,
    borderRightColor: '#ff0000',
  },
  icon: {
    fontSize: 16,
    marginRight: 24,
    width: 24,
  },
  label: {
    fontSize: 14,
    color: '#030303',
  },
  activeLabel: {
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  signInSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  signInPrompt: {
    fontSize: 13,
    color: '#606060',
    lineHeight: 18,
    marginBottom: 16,
  },
  signInButton: {
    borderWidth: 1,
    borderColor: '#065fd4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  signInButtonText: {
    color: '#065fd4',
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 13,
    color: '#606060',
    fontWeight: '500',
    paddingHorizontal: 24,
    paddingVertical: 8,
    letterSpacing: 0.5,
  },
});

export default Sidebar;