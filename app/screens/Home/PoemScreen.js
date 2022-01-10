import React, { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../config/colors';

function PoemScreen({ poems }) {

    const { title, by, content } = poems;
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.child}>
            <View style={styles.information}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>Book Name: {title}</Text>
                <Text style={styles.author}>By: {by}</Text>
                <Text style={styles.overview} ellipsizeMode='tail' numberOfLines={3}><Text style={styles.span}>overview:</Text> {content}</Text>
                <Button title="show more" color={colors.primary} onPress={() => setModalVisible(true)} />
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
                <ScrollView>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.span2}>Full Poem: {title}</Text>
                            <Text style={styles.full} >{content}</Text>
                            <Button
                                title='Finish'
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Modal>

        </View>
    );
}



const styles = StyleSheet.create({
    child: {
        padding: 5,
        backgroundColor: colors.lightBlue,
        marginBottom: 10,
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 10
    },
    information: {
        paddingHorizontal: 10,

    },
    title: {
        fontSize: 16,
    },
    author: {
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 16
    },
    span: {
        color: colors.primary,
    },
    span2: {
        color: colors.primary,
        fontSize: 20
    },
    overview: {
        marginBottom: 8
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
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
    full: {
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 10
    },
    buttons: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
})


export default PoemScreen;