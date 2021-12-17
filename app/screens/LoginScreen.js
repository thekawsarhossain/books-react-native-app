import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';

function LoginScreen() {
    return (
        <View style={styles.background}>
            <Text style={styles.title}>Hey There ! Just Login to read Books.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    title: {
        fontSize: 24,
        color: colors.primary
    }
});

export default LoginScreen;