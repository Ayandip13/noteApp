import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeScreen = ({ navigation }: any) => {
    const [notes, setNotes] = useState<string[]>([]);
    const rotation = useSharedValue(0);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const animations = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotation.value}deg` }
            ]
        }
    });

    const handleButtonPressed = () => {
        rotation.value = rotation.value === 0 ? withTiming(180, { duration: 500 }) : withSpring(0);
    };

    const deleteNote = async (index: number) => {
        try {
            const updatedNotes = [...notes];
            updatedNotes.splice(index, 1);
            setNotes(updatedNotes);
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes)); // Save updated list
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

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
                keyExtractor={(item, index) => item.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            marginTop: 100
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>No Notes</Text>
                    </View>
                )}
                renderItem={({ item, index }) => (
                    <Pressable>
                        <View style={styles.noteItem}>
                            {/* <Text>Notes That are created</Text> */}
                            <Text numberOfLines={1} style={{ fontSize: 15 }}>{item}</Text>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    gap: 10,
                                    alignItems: 'stretch',
                                    justifyContent: 'space-between'
                                }}>
                                <AntDesign name="delete" color="#000" size={20} onPress={() => deleteNote(index)} />
                                <AntDesign
                                    name="edit"
                                    color="#000"
                                    size={20}
                                    onPress={() => navigation.navigate('Add Note', { note: item, index })}
                                />
                            </View>
                        </View>
                    </Pressable>
                )}
            />
            {isButtonPressed && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 100, // distance above the FAB
                        right: 20,   // align with FAB's right position
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#F5BABB',
                            width: 90,
                            borderRadius: 8,
                            elevation: 5,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Add Note')}
                            style={{
                                marginTop: 20,
                            }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Add {"\n"} Notes</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                backgroundColor: '#000',
                                width: 60,
                                height: 2,
                                marginVertical: 10
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile')}
                            style={{
                                marginBottom: 20,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}
                            >See the {"\n"} Notes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}


            <Animated.View style={[styles.fab, animations]}>
                <TouchableOpacity
                    onPress={() => {
                        // navigation.navigate('AddNote');
                        handleButtonPressed();
                        setIsButtonPressed((prev) => !prev);
                    }}
                >
                    <AntDesign name="plus" color="#fff" size={30} />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 20,
        backgroundColor: '#FFF5F2',
    },
    noteItem: {
        backgroundColor: '#F5BABB',
        paddingHorizontal: 20,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 5,
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center'
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#064232',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});
