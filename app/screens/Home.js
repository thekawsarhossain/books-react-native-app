import React from 'react';
import { Text, View } from 'react-native';
import useAuth from '../Hooks/useAuth';

function Home() {

    const { user } = useAuth();

    return (
        <View>
            <Text>Hello This is Home {user.displayName}</Text>
        </View>
    );
}

export default Home;