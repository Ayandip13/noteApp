import React, { useEffect } from 'react';
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

const noteSchema = Yup.object().shape({
    text: Yup.string()
        .trim()
        .required('* Note cannot be empty')
});

const AddNoteScreen = ({ navigation }: any) => {
    const route = useRoute();
    const { note: existingNote, index } = route.params || {};

    const saveNote = async (noteText: string) => {
        const stored = await AsyncStorage.getItem('notes');
        const notes = stored ? JSON.parse(stored) : [];

        if (index !== undefined) {
            notes[index] = noteText; // update
        } else {
            notes.push(noteText); // add
        }
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
            <Formik
                initialValues={{ text: existingNote || '' }}
                validationSchema={noteSchema}
                onSubmit={(values) => saveNote(values.text)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Write your note here..."
                            multiline
                            value={values.text}
                            onChangeText={handleChange('text')}
                            onBlur={handleBlur('text')}
                        />
                        {touched.text && errors.text && (
                            <Text style={styles.errorText}>{errors.text}</Text>
                        )}

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSubmit as any}
                        >
                            <Text style={styles.saveButtonText}>Save Note</Text>
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
        backgroundColor: '#FFF5F2'
    },
    input: {
        flex: 1,
        borderColor: '#aaa',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        textAlignVertical: 'top',
        marginBottom: 8,
        minHeight: 150
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
        marginLeft:5,
        fontWeight: 'bold'
    },
    saveButton: {
        backgroundColor: '#F5BABB',
        marginHorizontal: 40,
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 10
    },
    saveButtonText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000'
    }
});
