import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const AddNoteScreen = ({ navigation }: any) => {
    const [note, setNote] = useState('');

    const saveNote = async () => {
        if (!note.trim()) return;

        const stored = await AsyncStorage.getItem('notes');
        const notes = stored ? JSON.parse(stored) : [];
        notes.push(note);
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
            <TextInput
                style={styles.input}
                placeholder="Write your note here..."
                multiline
                value={note}
                onChangeText={setNote}
            />
            {/* <Button title="Save Note" onPress={saveNote} /> */}
            <TouchableOpacity
                style={{
                    backgroundColor: '#E7D3D3',
                    marginHorizontal: 40,
                    marginVertical: 10,
                    paddingVertical: 10,
                    borderRadius: 10
                }}>
                <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>Save Note</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        textAlignVertical: 'top',
        marginBottom: 16,
    },
});
