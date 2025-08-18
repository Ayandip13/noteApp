import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store';

const ProfileScreen = () => {
  const [notes, setNotes] = useState<string[]>([]);

  // Redux theme
  const theme = useSelector((state: RootState) => state.theme.theme);

  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem('notes');
    if (saved) setNotes(JSON.parse(saved));
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme === 'dark' ? '#333' : '#FFF5F2',
      }}
    >
      <FlatList
        ListEmptyComponent={() => (
          <Text style={{ color: theme === 'dark' ? '#FFF' : '#000', fontSize: 16 }}>
            No notes yet
          </Text>
        )}
        data={notes}
        renderItem={({ item }) => (
          <Text
            style={{
              color: theme === 'dark' ? '#FFF' : '#000',
              fontSize: 16,
              marginVertical: 5,
            }}
          >
            {item}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ProfileScreen;
