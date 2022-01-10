import { ActivityIndicator, Button, Snackbar } from '@react-native-material/core';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { clear } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import { useNavigate } from 'react-router';
import colors from '../../config/colors';
import NavigationScreen from './NavigationScreen';

function PublishBook() {

    // react router native hook
    const navigate = useNavigate();

    // all the hooks of input data here 
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
            if (json.insertedId) {
                return Alert.alert(
                    "Success !",
                    "Hey there you book is published now go to the home page you can find your book there !",
                    [
                        {
                            text: "Home",
                            onPress: () => navigate('/home'),
                            // style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") },
                    ]
                );
            }

        } catch (error) {
            console.error(error);
        }
        finally { setLoading(false) }
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
            {!loading ? <Button onPress={handlePublish} title="Publish" color={colors.primary} /> : <Button
                title="Button"
                loading={loading}
                loadingIndicatorPosition="overlay"
                color={colors.primary}
            />}

            <Button style={styles.poemBtn} onPress={() => navigate('/publish-poem')} title="publish a poem" />

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
    },
    poemBtn: {
        fontSize: 16,
        marginTop: 20,
        backgroundColor: colors.pinkRed
    },
})

export default PublishBook;