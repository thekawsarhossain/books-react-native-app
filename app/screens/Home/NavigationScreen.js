import React from 'react';
import { AppBar, IconButton, FAB, HStack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colors from '../../config/colors';
import { useNavigate } from 'react-router';
import { StyleSheet } from 'react-native';

function NavigationScreen() {

    const navigate = useNavigate();


    return (
        <AppBar
            color={colors.primary}
            tintColor={colors.white}
            // leading={props => (

            // )}
            trailing={props => (
                <HStack style={styles.bars}>
                    <IconButton onPress={() => navigate('/home')} icon={props => <Icon name="home" {...props} />} {...props} />
                    <IconButton
                        onPress={() => navigate('/free')}
                        icon={props => <Icon name="book" {...props} />}
                        {...props}
                    />
                    <IconButton
                        onPress={() => navigate('/publish-new')}
                        icon={props => <Icon name="plus" {...props} />}
                        {...props}
                    />
                    <IconButton
                        onPress={() => navigate('/cart')}
                        icon={props => <Icon name="cart" {...props} />}
                        {...props}
                    />
                    <IconButton
                        onPress={() => navigate('/profile')}
                        icon={props => <Icon name="account" {...props} />}
                        {...props}
                    />
                </HStack>
            )}
            style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
        >
        </AppBar>
    );
}

const styles = StyleSheet.create({
    bars: {
        width: '96%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: -15
    }
})

export default NavigationScreen;

