import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store';

const noteSchema = Yup.object().shape({
    text: Yup.string().trim().required('* Note cannot be empty'),
});

const AddNoteScreen = ({ navigation }: any) => {
    const route = useRoute();
    const { note: existingNote, index } = route.params || {};

    // Redux theme
    const theme = useSelector((state: RootState) => state.theme.theme);

    const saveNote = async (noteText: string) => {
        const stored = await AsyncStorage.getItem('notes');
        const notes = stored ? JSON.parse(stored) : [];

        if (index !== undefined) {
            notes[index] = noteText; // update existing note
        } else {
            notes.push(noteText); // add new note
        }

        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={[
                styles.container,
                { backgroundColor: theme === 'dark' ? '#111' : '#FFF5F2' },
            ]}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
            <Formik
                initialValues={{ text: existingNote || '' }}
                validationSchema={noteSchema}
                onSubmit={(values, { resetForm }) => {
                    saveNote(values.text);
                    resetForm();
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: theme === 'dark' ? '#555' : '#fff',
                                    color: theme === 'dark' ? '#fff' : '#000',
                                    borderColor: theme === 'dark' ? '#555' : '#aaa',
                                },
                            ]}
                            placeholder="Write your note here..."
                            placeholderTextColor={theme === 'dark' ? '#888' : '#666'}
                            multiline
                            value={values.text}
                            onChangeText={handleChange('text')}
                            onBlur={handleBlur('text')}
                        />
                        {touched.text && errors.text && (
                            <Text style={styles.errorText}>{errors.text}</Text>
                        )}

                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                {
                                    backgroundColor:
                                        theme === 'dark' ? '#064232' : '#F5BABB',
                                },
                            ]}
                            onPress={handleSubmit as any}
                        >
                            <Text
                                style={[
                                    styles.saveButtonText,
                                    { color: theme === 'dark' ? '#FFF' : '#000' },
                                ]}
                            >
                                Save Note
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
    );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        textAlignVertical: 'top',
        marginBottom: 8,
        minHeight: 150,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    saveButton: {
        marginHorizontal: 40,
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
    saveButtonText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    },
});
