import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import useAuth from '../../Hooks/useAuth';
import BooksScreen from './BooksScreen';
import NavigationScreen from './NavigationScreen';

function Home() {

    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <BooksScreen />
            <NavigationScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Home;