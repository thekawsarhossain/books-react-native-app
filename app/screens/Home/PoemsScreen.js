import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../config/colors';
import NavigationScreen from './NavigationScreen';
import PoemScreen from './PoemScreen';

function PoemsScreen() {

    const [poems, setPoems] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPoems = async () => {
        try {
            const response = await fetch('https://mighty-ocean-62001.herokuapp.com/poems');
            const json = await response.json();
            setPoems(json);
        } catch (error) {
            console.error(error);
        }
        finally { setLoading(false) }
    }

    useEffect(() => {
        getPoems();
    }, []);

    if (loading) {
        return <View style={styles.loading}><ActivityIndicator size="large" color={colors.primary} /></View>
    }

    return (
        <>
            <ScrollView>
                <Text style={styles.title}>Read all the free Poems !</Text>
                <View style={styles.container}>
                    {
                        poems.map((poem) => <PoemScreen
                            key={poem._id}
                            poems={poem}
                        />)
                    }
                </View>
            </ScrollView>
            <NavigationScreen />
        </>
    );
}


const styles = StyleSheet.create({
    parent: {
        flex: 1,
        marginVertical: 10,
    },
    title: {
        fontSize: 20,
        marginVertical: 15,
        color: colors.primary,
        marginHorizontal: 15,
        borderBottomWidth: 1
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default PoemsScreen;