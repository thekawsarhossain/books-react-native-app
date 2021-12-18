import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import useAuth from '../../Hooks/useAuth';
import BooksScreen from './BooksScreen';

function Home() {

    const { user, logoutUser } = useAuth();

    return (
        <View style={styles.container}>
            <Button title='logout' onPress={logoutUser} />
            <Text>Hello This is Home {user.displayName}</Text>
            <BooksScreen />
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