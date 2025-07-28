import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }: any) => {
    const [notes, setNotes] = useState<string[]>([]);

    const loadNotes = async () => {
        const saved = await AsyncStorage.getItem('notes');
        if (saved) setNotes(JSON.parse(saved));
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadNotes);
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('NoteDetail', { note: item })}
                    >
                        <View style={styles.noteItem}>
                            <Text>{item}</Text> {/* If item is a string */}
                        </View>
                    </TouchableOpacity>
                )}

            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddNote')}
            >
                <Icon name="add" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    noteItem: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#D25D5D',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});
