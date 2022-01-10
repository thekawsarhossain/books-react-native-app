import { ActivityIndicator } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigate, useLocation } from 'react-router';
import colors from '../config/colors';
import useAuth from '../Hooks/useAuth';

const PrivateScreen = ({ children }) => {

    // useAuth custom hook here 
    const { user, loading } = useAuth();

    // react router hook here 
    const location = useLocation();

    // loading statement here 
    if (loading) {
        return <View style={styles.loading}><ActivityIndicator size="large" color={colors.primary} /></View>
    }

    // main private route setup here
    if (user?.email) {
        return children;
    } else {
        return <Navigate to="/login" state={{ from: location }} />
    }
};



const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PrivateScreen;