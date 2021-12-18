import React from 'react';
import { AppBar, IconButton, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colors from '../../config/colors';
import { useNavigate } from 'react-router';

function NavigationScreen() {

    const navigate = useNavigate();

    return (
        <AppBar
            color={colors.primary}
            variant="bottom"
            leading={props => (
                <IconButton onPress={() => navigate('/home')} icon={props => <Icon name="home" {...props} />} {...props} />
            )}
            trailing={props => (
                <IconButton
                    onPress={() => navigate('/profile')}
                    icon={props => <Icon name="account" {...props} />}
                    {...props}
                />
            )}
            style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
        >
            <FAB
                icon={props => <Icon name="magnify" {...props} />}
                style={{ position: "absolute", top: -28, alignSelf: "center" }}
            />
        </AppBar>
    );
}

export default NavigationScreen;
