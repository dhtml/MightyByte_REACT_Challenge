import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable } from 'react-native';

const YouTubeHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Pressable style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>📺 YouTube</Text>
        </View>
      </View>
      
      <View style={styles.centerSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
          />
          <Pressable style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </Pressable>
        </View>
        <Pressable style={styles.micButton}>
          <Text style={styles.micIcon}>🎤</Text>
        </Pressable>
      </View>
      
      <View style={styles.rightSection}>
        <Pressable style={styles.iconButton}>
          <Text style={styles.icon}>⋮</Text>
        </Pressable>
        <Pressable style={styles.signInButton}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: 56,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 18,
    color: '#666',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    maxWidth: 640,
    marginHorizontal: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    outlineStyle: 'none',
  },
  searchButton: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  searchIcon: {
    fontSize: 18,
    color: '#666',
  },
  micButton: {
    marginLeft: 8,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 50,
  },
  micIcon: {
    fontSize: 16,
    color: '#666',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 8,
    marginRight: 8,
  },
  icon: {
    fontSize: 18,
    color: '#666',
  },
  signInButton: {
    borderWidth: 1,
    borderColor: '#065fd4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 2,
  },
  signInText: {
    color: '#065fd4',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default YouTubeHeader;