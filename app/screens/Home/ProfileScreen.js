import React from 'react';
import { Button, Text, View } from 'react-native';
import colors from '../../config/colors';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';

function ProfileScreen() {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();
    return (
        <View>
            <Text>This is the profile </Text>
            <Button title='logout' onPress={logoutUser} />
            <Button title='home' onPress={() => navigate('/home')} />
        </View>
    );
}

export default ProfileScreen;