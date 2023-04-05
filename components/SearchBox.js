import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // perform search with searchQuery
  }

  return (
    <View style={styles.searchBox}>
      <MaterialIcons name="search" size={24} color="gray" />
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Enter search query"
        style={styles.searchInput}
      />
      <MaterialIcons
        name="cancel"
        size={24}
        color="gray"
        onPress={() => setSearchQuery('')}
        style={styles.cancelIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  cancelIcon: {
    marginLeft: 8,
  },
});

export default SearchBox;