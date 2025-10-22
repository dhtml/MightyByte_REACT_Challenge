import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

const FilterChips: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = [
    'All', 'Deep House', 'Playlists', 'Chill-out music', 'Live', 
    'Acoustic guitar', 'Music', 'Brazilian Music', 'Arrocha', 
    'History', 'Comedy', 'Soca', 'Recently uploaded'
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter, index) => (
          <Pressable
            key={index}
            style={[
              styles.chip,
              activeFilter === filter && styles.activeChip
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.chipText,
              activeFilter === filter && styles.activeChipText
            ]}>
              {filter}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 12,
  },
  chip: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeChip: {
    backgroundColor: '#0f0f0f',
    borderColor: '#0f0f0f',
  },
  chipText: {
    fontSize: 14,
    color: '#0f0f0f',
    fontWeight: '400',
    whiteSpace: 'nowrap',
  },
  activeChipText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default FilterChips;