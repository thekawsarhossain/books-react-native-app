import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import colors from '../config/colors';
import { useNavigate } from 'react-router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function LoginScreen() {

    const navigate = useNavigate();

    return (
        <View style={styles.background}>
            <Button onPress={() => navigate('/')} title='home' />
            <FontAwesomeIcon icon={faCoffee} />
            <Text style={styles.title}>Hey There ! Just Login to read Books.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.white
    },
    title: {
        fontSize: 24,
        color: colors.primary
    }
});

export default LoginScreen;