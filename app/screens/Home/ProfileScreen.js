import React from 'react';
import { Button, Text, View } from 'react-native';
import colors from '../../config/colors';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import { StyleSheet } from 'react-native';
import NavigationScreen from './NavigationScreen';

function ProfileScreen() {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    return (
        <View style={styles.container}>
            <Text>This is the profile </Text>
            <Button title='logout' onPress={logoutUser} />
            <Button title='home' onPress={() => navigate('/home')} />
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


export default ProfileScreen;