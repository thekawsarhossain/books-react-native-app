import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

function BooksScreen() {

    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => setBooks(data))
    }, [])

    console.log(books)

    return (
        <View>
            <Text>{books.length}</Text>
        </View>
    );
}

export default BooksScreen;