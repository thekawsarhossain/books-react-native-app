import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button } from '@react-native-material/core';
import { StyleSheet, Text, View, ScrollView, SectionList, Item, Alert } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colors from '../../config/colors';
import useAuth from '../../Hooks/useAuth';
import NavigationScreen from './NavigationScreen';

function CartScreen() {

    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirm, setConfirm] = useState(false);

    // getting orders informations here
    const getOrders = async () => {
        try {
            const response = await fetch(`https://mighty-ocean-62001.herokuapp.com/orders/${user.email}`);
            const json = await response.json();
            setOrders(json);
        } catch (error) {
            console.error(error);
        }
        finally { setLoading(false) }
    }

    useEffect(() => {
        getOrders();
    }, []);

    // handle order delete here 
    const handleDelete = async (id) => {
        Alert.alert(
            "Are your sure?",
            "Are you sure you want to cencel this order?",
            [
                {
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        setConfirm(true);
                    },
                },

            ]);

        if (confirm) {
            try {
                const response = await fetch(`https://mighty-ocean-62001.herokuapp.com/orders/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                const json = await response.json();
                console.log(json);
                if (json.deletedCount) {
                    const newOrders = orders.filter(order => order._id !== id);
                    setOrders(newOrders)
                }

            }
            catch (error) {
                console.error(error);
            }
            finally { setConfirm(false) }
        }
    }

    if (loading) {
        return <View style={styles.loading}><ActivityIndicator size="large" color={colors.primary} /></View>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Hello <Text style={styles.span}>{user.displayName}</Text> here is your cart details !
            </Text>
            <ScrollView style={styles.parent}>
                {
                    orders.map(order => <View key={order._id} style={styles.child}>
                        <View>
                            <Text>Book Name: {order.bookName}</Text>
                            <Text>OrderedBy: {order.userName}</Text>
                            <Text>address: {order.address}</Text>
                            <Text>Total: {order.total}</Text>
                        </View>
                        <View>
                            <Text>status: {order.status}</Text>
                            <Text>ordered: {order.date}</Text>
                            <Button
                                onPress={() => handleDelete(order._id)}
                                variant="outlined"
                                color={colors.red}
                                title="Delete"
                                leading={props => <Icon name="delete" {...props} />}
                            />
                        </View>
                    </View>)
                }
            </ScrollView>
            <NavigationScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10
    },
    parent: {
        width: '95%'
    },
    child: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.lightBlue,
        marginVertical: 5,
        padding: 10
    },
    span: {
        color: colors.primary
    },
    title: {
        fontSize: 18,
        marginBottom: 15
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default CartScreen;