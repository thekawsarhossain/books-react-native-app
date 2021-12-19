import { ActivityIndicator } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useParams, useNavigate } from 'react-router';
import colors from '../../config/colors';
import useAuth from '../../Hooks/useAuth';
import NavigationScreen from './NavigationScreen';

function BookInformation() {

    const navigate = useNavigate();

    // context api data destructure here 
    const { user } = useAuth();

    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderLoader, setOrderLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // book order states 
    const [address, setAddress] = useState('');

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

    // handle order function here 
    const handleOrder = async () => {

        const orderData = {
            bookName: title,
            userName: user.displayName,
            address,
            email: user.email,
            total: price,
            status: 'pending',
            date: new Date().toLocaleDateString()
        }

        // api post here 
        try {
            setOrderLoader(true)
            const response = await fetch(`https://mighty-ocean-62001.herokuapp.com/orders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
            const json = await response.json();
            if (json.insertedId) {
                return Alert.alert(
                    "Success !",
                    "Hey there you have successfully ordered the book, just do the payment then you will get the book soon !",
                    [
                        {
                            text: "Home",
                            onPress: () => navigate('/home'),
                            // style: "cancel"
                        },
                        { text: "OK", onPress: () => setModalVisible(!modalVisible) },
                    ]
                );
            }

        } catch (error) {
            console.error(error);
        }
        finally { setOrderLoader(false) }

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
                    {!orderLoader ? <Button onPress={() => setModalVisible(true)} title="Buy now" color={colors.primary} /> : <Button
                        title="Button"
                        loading={loading}
                        loadingIndicatorPosition="overlay"
                        color={colors.primary}
                    />}
                </View>
            </View>

            {/* modal code here  */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Place Your Order</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={title}
                        />
                        <TextInput
                            style={styles.input}
                            defaultValue={user.displayName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Your Address'
                            onChangeText={(address) => setAddress(address)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Your Number'
                            defaultValue={user.email}
                        />

                        <View style={styles.buttons}>
                            <Button
                                title='Not Now'
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                            <Button
                                title='Place Now'
                                onPress={handleOrder}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

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
    input: {
        width: '95%',
        height: 50,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttons: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default BookInformation;