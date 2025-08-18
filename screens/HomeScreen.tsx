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
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../src/store/store';
import { toggleTheme } from '../src/store/themeSlice';

const HomeScreen = ({ navigation }: any) => {
    const [notes, setNotes] = useState<string[]>([]);
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);

    // Redux theme
    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch<AppDispatch>();

    // Animated styles
    const noNotesAnim = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const opacityAnim = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const fabAnim = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    useEffect(() => {
        if (notes.length === 0) {
            scale.value = 0.8;
            scale.value = withSpring(1, { damping: 5, stiffness: 20 });
        }
    }, [notes]);

    const handleButtonPressed = () => {
        rotation.value =
            rotation.value === 0
                ? withTiming(180, { duration: 300 })
                : withSpring(0);
    };

    const deleteNote = async (index: number) => {
        try {
            const updatedNotes = [...notes];
            updatedNotes.splice(index, 1);
            setNotes(updatedNotes);
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
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
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme === 'dark' ? '#333' : '#FFF5F2',
                },
            ]}
        >
            <FlatList
                data={notes}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
                        <Animated.Text
                            style={[
                                {
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: theme === 'dark' ? '#FFF' : '#000',
                                },
                                noNotesAnim,
                            ]}
                        >
                            No Notes
                        </Animated.Text>
                    </View>
                )}
                renderItem={({ item, index }) => (
                    <Pressable>
                        <View
                            style={[
                                styles.noteItem,
                                {
                                    backgroundColor:
                                        theme === 'dark' ? '#333' : '#F5BABB',
                                },
                            ]}
                        >
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 15,
                                    color: theme === 'dark' ? '#FFF' : '#000',
                                }}
                            >
                                {item}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    gap: 10,
                                    alignItems: 'stretch',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <AntDesign
                                    name="delete"
                                    color={theme === 'dark' ? '#FFF' : '#000'}
                                    size={20}
                                    onPress={() => deleteNote(index)}
                                />
                                <AntDesign
                                    name="edit"
                                    color={theme === 'dark' ? '#FFF' : '#000'}
                                    size={20}
                                    onPress={() =>
                                        navigation.navigate('Add Note', {
                                            note: item,
                                            index,
                                        })
                                    }
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
                        bottom: 100,
                        right: 20,
                        alignItems: 'center',
                    }}
                >
                    <Animated.View
                        style={[
                            {
                                backgroundColor:
                                    theme === 'dark' ? '#444' : '#F5BABB',
                                width: 90,
                                borderRadius: 8,
                                elevation: 5,
                                alignItems: 'center',
                            },
                            opacityAnim,
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Add Notes')}
                            style={{ marginTop: 20 }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: theme === 'dark' ? '#FFF' : '#000',
                                }}
                            >
                                Add {'\n'} Notes
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                backgroundColor: theme === 'dark' ? '#FFF' : '#000',
                                width: 60,
                                height: 2,
                                marginVertical: 10,
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile')}
                            style={{ marginBottom: 20 }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: theme === 'dark' ? '#FFF' : '#000',
                                }}
                            >
                                See the {'\n'} Notes
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            )}

            <Animated.View style={[styles.fab, fabAnim]}>
                <TouchableOpacity
                    onPress={() => {
                        handleButtonPressed();
                        setIsButtonPressed((prev) => !prev);
                    }}
                    onLongPress={() => dispatch(toggleTheme())} // 🌙 toggle theme on long press
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
    },
    noteItem: {
        paddingHorizontal: 20,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 5,
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        // marginTop:10,
        right: 20,
        bottom: 30,
        backgroundColor: '#064232',
        // backgroundColor: 'red',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});
