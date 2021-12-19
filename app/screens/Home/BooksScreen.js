import { ActivityIndicator, TextInput } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import colors from '../../config/colors';
import BookScreen from './BookScreen';

function BooksScreen() {

    const [books, setBooks] = useState([]);
    // const [displayBook, setDisplayBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const getBooks = async () => {
        try {
            const response = await fetch('https://mighty-ocean-62001.herokuapp.com/books');
            const json = await response.json();
            // setDisplayBooks(json)
            setBooks(json);
        } catch (error) {
            console.error(error);
        }
        finally { setLoading(false) }
    }

    useEffect(() => {
        getBooks();
    }, []);

    if (loading) {
        return <View style={styles.loading}><ActivityIndicator size="large" color={colors.primary} /></View>
    }

    // const searchedData = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
    // setDisplayBooks(searchedData);

    return (
        <ScrollView>
            {/* <View style={{ marginTop: 10 }}>
                <TextInput placeholder='search here' onChangeText={search => setSearch(search)} />
            </View> */}
            <View style={styles.parent}>
                {
                    books.map((book) => <BookScreen
                        key={book._id}
                        books={book}
                    />)
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        marginVertical: 10,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BooksScreen;