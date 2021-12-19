import { ActivityIndicator } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-web';
import { useParams } from 'react-router';
import colors from '../../config/colors';
import NavigationScreen from './NavigationScreen';

function BookInformation() {

    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);

    const { author, coverImage, pageCount, publisher, title, synopsis, price } = book;

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
    }, []);

    if (loading) {
        return <View style={styles.loading}><ActivityIndicator size="large" color={colors.primary} /></View>
    }

    return (
        <View style={styles.container}>
            <View style={styles.parent}>
                <Image source={{ uri: coverImage }} resizeMode='cover' style={{ height: 250 }} />

                <View style={styles.information}>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>Book Name: {title}</Text>
                    <Text style={styles.author}>Author: {author}</Text>
                    <Text>Total Page: {pageCount}</Text>
                    <Text>Publisher: {publisher}</Text>
                    <Text>Price: {price}</Text>
                    <Text style={styles.overview}><Text style={styles.span}>Overview:</Text> {synopsis}</Text>
                    <Button title="Buy now" color={colors.primary} />
                </View>
            </View>

            {/* navigation component here  */}
            <NavigationScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    parent: {
        width: '95%',
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: colors.lightBlue
    },
    information: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
    },
    author: {
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 18
    },
    span: {
        color: colors.white,
        fontSize: 16
    },
    overview: {
        marginBottom: 8,
        fontSize: 16
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default BookInformation;