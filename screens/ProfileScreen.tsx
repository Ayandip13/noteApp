import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem('notes');
    if (saved) setNotes(JSON.parse(saved));
  };
  useEffect(() => {
    loadNotes()
  }, [])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <FlatList
        ListEmptyComponent={() => <Text>No notes yet</Text>}
        data={notes}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default ProfileScreen