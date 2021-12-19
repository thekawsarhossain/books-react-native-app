import { ActivityIndicator, Button } from '@react-native-material/core';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { clear } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import colors from '../../config/colors';
import NavigationScreen from './NavigationScreen';

function PublishBook() {

    const [loading, setLoading] = useState(false)
    const [coverImage, setCoverImage] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [publisher, setPublisher] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [price, setPrice] = useState('');

    const bookData = { title, author, coverImage, pageCount, publisher, synopsis, price }

    const handlePublish = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://mighty-ocean-62001.herokuapp.com/books`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });
            const json = await response.json();
            console.log(json)

        } catch (error) {
            console.error(error);
        }
        finally { setLoading(false) }
    }

    if (loading) {
        return <View style={styles.loading}><ActivityIndicator size="large" color={colors.primary} /></View>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Publish a new book here</Text>
            <TextInput
                style={styles.input}
                placeholder='Book Name'
                onChangeText={(bookName) => setTitle(bookName)}
            />
            <TextInput
                style={styles.input}
                placeholder='Author Name'
                onChangeText={(name) => setAuthor(name)}
            />
            <TextInput
                style={styles.input}
                placeholder='Image Link'
                onChangeText={(link) => setCoverImage(link)}
            />
            <TextInput
                style={styles.input}
                placeholder='Total Page'
                onChangeText={(pages) => setPageCount(pages)}
            />
            <TextInput
                style={styles.input}
                placeholder='Publisher'
                onChangeText={(publisher) => setPublisher(publisher)}
            />
            <TextInput
                multiline
                numberOfLines={4}
                style={styles.input}
                placeholder='Overview'
                onChangeText={(overview) => setSynopsis(overview)}
            />
            <TextInput
                style={styles.input}
                placeholder='price'
                onChangeText={(price) => setPrice(price)}
            />
            <Button onPress={handlePublish} title="Publish" color={colors.primary} />
            <NavigationScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 15,
        color: colors.primary
    },
    input: {
        width: '80%',
        height: 50,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PublishBook;