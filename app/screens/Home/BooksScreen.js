import { ActivityIndicator, TextInput } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native';
import colors from '../../config/colors';
import BookScreen from './BookScreen';

function BooksScreen() {

    const [books, setBooks] = useState([]);
    const [displayBook, setDisplayBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');


    const filteredData = books?.filter(book => book?.title?.toLowerCase().includes(search?.toLowerCase()));
    // setDisplayBooks(filteredData);

    const getBooks = async () => {
        try {
            const response = await fetch('https://mighty-ocean-62001.herokuapp.com/books');
            const json = await response.json();
            setBooks(json);
            setDisplayBooks(json)
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

    return (
        <ScrollView>
            <View style={styles.search}>
                <TextInput
                    style={styles.input}
                    placeholder='search here'
                    onChangeText={search => setSearch(search)}
                />
            </View>
            <View style={styles.parent}>
                {
                    displayBook?.map((book) => <BookScreen
                        key={book?._id}
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
    },
    search: {
        flex: 1,
        justifyContent: 'space-between'
    },
    input: {
        width: '100%',
        height: 50,
        marginBottom: 8,
        marginTop: 10,
    },
})

export default BooksScreen;