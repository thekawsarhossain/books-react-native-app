import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useNavigate } from 'react-router';
import colors from '../../config/colors';

function BookScreen({ books }) {

    // book data destructure here 
    const { author, coverImage, pageCount, publisher, title, synopsis, _id } = books;

    const navigate = useNavigate();

    return (
        <View style={styles.child}>
            <Image source={{ uri: coverImage }} resizeMode='contain' style={{ width: '30%', height: 160 }} />
            <View style={styles.information}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>Book Name: {title}</Text>
                <Text style={styles.author}>Author: {author}</Text>
                <Text>Total Page: {pageCount}</Text>
                <Text>Publisher: {publisher}</Text>
                <Text style={styles.overview} ellipsizeMode='tail' numberOfLines={3}><Text style={styles.span}>Overview:</Text> {synopsis}</Text>
                <Button onPress={() => navigate(`/book/${_id}`)} title="more" color={colors.primary} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    child: {
        padding: 5,
        backgroundColor: colors.lightBlue,
        marginBottom: 10,
        flexDirection: 'row'
    },
    information: {
        paddingHorizontal: 10,
        width: '65%'
    },
    title: {
        fontSize: 18,
    },
    author: {
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 16
    },
    span: {
        color: colors.white,
    },
    overview: {
        marginBottom: 8
    }
})

export default BookScreen;