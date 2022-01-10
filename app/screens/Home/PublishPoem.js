import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import colors from '../../config/colors';
import NavigationScreen from './NavigationScreen';

function PublishPoem() {

    // react router native hook
    const navigate = useNavigate();

    // all the hooks of input data here 
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('');
    const [by, setBy] = useState('');
    const [content, setContent] = useState('');

    const poemData = { title, content, by }

    const handlePublish = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://mighty-ocean-62001.herokuapp.com/poems`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(poemData)
            });
            const json = await response.json();
            if (json.insertedId) {
                return Alert.alert(
                    "Success !",
                    "Hey there you Poem is published now go to the poem page you can find your poem there !",
                    [
                        {
                            text: "Poems",
                            onPress: () => navigate('/poems'),
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
            <Text style={styles.title}>Publish a new Poem here</Text>
            <TextInput
                style={styles.input}
                placeholder='Poem Title'
                onChangeText={(title) => setTitle(title)}
            />
            <TextInput
                style={styles.input}
                placeholder='Author Name'
                onChangeText={(by) => setBy(by)}
            />
            <TextInput
                style={styles.input}
                placeholder='Poem Content'
                onChangeText={(content) => setContent(content)}
            />
            {!loading ? <Button onPress={handlePublish} title="Publish" color={colors.primary} /> : <Button
                disabled
                title="wait"
                loading={loading}
                loadingIndicatorPosition="overlay"
                color={colors.primary}
            />}
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
})

export default PublishPoem;