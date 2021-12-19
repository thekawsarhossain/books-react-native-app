import React from 'react';
import { Button, Image, Text, View } from 'react-native';
import colors from '../../config/colors';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import { StyleSheet } from 'react-native';
import NavigationScreen from './NavigationScreen';
import profile from '../../assets/images/profile.png';

function ProfileScreen() {
    const { user, logoutUser } = useAuth();
    console.log(user)
    const navigate = useNavigate();

    return (
        <View style={styles.container}>

            <View style={styles.profile}>
                <Text style={styles.title}>Hello <Text style={styles.span}>{user.displayName}</Text> Welcome back ! </Text>

                <Image
                    style={styles.profileImage}
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp9A6Qfhux7lq3H7H-6zdsjNNbyPFM1lmOoTMICDtFmJpmaljg5OgztBqXKDHnn6GHmdg&usqp=CAU"
                    }}
                />

                <View style={styles.info}>
                    <Text style={styles.text}>Name: {user.displayName}</Text>
                    <Text style={styles.text}>Name: {user.email}</Text>
                    <Text style={styles.text}>verified: {user.emailVerified ? user.emailVerified : 'Not Verified'}</Text>
                </View>

                <Button title='logout' onPress={logoutUser} />
            </View>

            <NavigationScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
    },
    profile: {
        width: '95%',
        backgroundColor: colors.lightBlue,
        padding: 10
    },
    profileImage: {
        width: '100%',
        height: 270,
    },
    span: {
        color: colors.primary
    },
    title: {
        fontSize: 18,
        marginBottom: 15
    },
    text: {
        fontSize: 18,
        marginBottom: 5
    },
    info: {
        marginVertical: 10
    }
})


export default ProfileScreen;