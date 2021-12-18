import { ActivityIndicator } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useParams } from 'react-router';
import colors from '../../config/colors';
import NavigationScreen from './NavigationScreen';

function BookInformation() {

    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBook = async () => {
        try {
            const response = await fetch(`https://mighty-ocean-62001.herokuapp.com/book/${id}`);
            const json = await response.json();
            setBook(json);
        } catch (error) {
            console.error(error);
        }
        finally { setLoading(false) }
    }

    useEffect(() => {
        getBook();
    }, [id]);

    if (loading) {
        return <View style={styles.loading}><ActivityIndicator size="large" color={colors.primary} /></View>
    }

    return (
        <View style={styles.container}>
            <Text>the id is {id}, {book.title}</Text>
            <NavigationScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default BookInformation;