import React from 'react';
import { Button, Image, StyleSheet, Text, View, Alert } from 'react-native';
import book from '../assets/images/book.png';
import { useNavigate } from "react-router";
import colors from '../config/colors';

function WelcomeScreen() {

    const navigate = useNavigate();

    return (
        <View style={styles.background} >
            <Text style={styles.title1}>Hey There ! Welcome</Text>
            <Text style={styles.title2}> Just Login or Signup to read Books.</Text>
            <Image style={styles.image} resizeMode='contain' source={book} />

            {/* login and signup button here  */}
            <View style={styles.buttons}>
                <Button onPress={() => navigate('/login')} color={colors.primary} title='Login' />
                <Button onPress={() => navigate('/signup')} color={colors.pinkRed} title='Signup' />
            </View>
        </View>
    );
}

// style start here 
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title1: {
        fontSize: 28,
        fontWeight: '500',
        color: colors.primary,
    },
    title2: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.black,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: '50%'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '40%'
    },
});

export default WelcomeScreen