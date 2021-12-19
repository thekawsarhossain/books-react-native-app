import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationScreen from './NavigationScreen';

function CartScreen() {
    return (
        <View style={styles.container}>
            <Text>
                Hello There this is the cart area
            </Text>
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


export default CartScreen;