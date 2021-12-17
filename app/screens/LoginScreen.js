import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';
import colors from '../config/colors';
import { useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';


function LoginScreen() {

    // context api data here 
    const { signIn } = useAuth();

    const navigate = useNavigate();

    // states 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.background}>
            <Button onPress={() => navigate('/')} color={colors.primary} title='home' />

            {/* main content of login here  */}
            <View style={styles.container}>
                <Text style={styles.title}>Login Here</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Email'
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder='Enter Password'
                    onChangeText={(password) => setPassword(password)}
                />
                <Button title='login' color={colors.pinkRed} onPress={() => signIn(email, password, navigate)} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        color: colors.primary,
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        padding: 4,
        marginBottom: 15
    },
    input: {
        width: '80%',
        height: 50,
        marginBottom: 15,
        borderWidth: 1,
        padding: 10,
    }
});

export default LoginScreen;