import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import colors from '../config/colors';
import { useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { AppBar, FAB, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


function LoginScreen() {

    // context api data here 
    const { signIn, error, user } = useAuth();

    const navigate = useNavigate();

    // states 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.background}>

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

                <AppBar
                    color={colors.primary}
                    variant="bottom"
                    style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
                >
                    <FAB
                        onPress={() => navigate('/')}
                        icon={props => <Icon name="home" {...props} />}
                        style={{ position: "absolute", top: -28, alignSelf: "center" }}
                    />
                </AppBar>

                {/* alert box here  */}
                <View>
                    <Text style={styles.alertbar}>{error && error}</Text>
                </View>

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
    },
    or: {
        margin: 15,
        fontWeight: 'bold',
        fontSize: 18
    },
    alertbar: {
        marginTop: 15,
        color: colors.red
    }
});

export default LoginScreen;