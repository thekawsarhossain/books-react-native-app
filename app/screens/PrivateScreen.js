import React from 'react';
import { Text, View } from 'react-native';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';

const PrivateScreen = ({ children }) => {

    // useAuth custom hook here 
    const { user, loading } = useAuth();

    // react router hook here 
    const location = useLocation();

    // loading statement here 
    if (loading) {
        return <View>
            <Text>Kawsar's app</Text>
        </View>
    }

    // main private route setup here
    if (user?.email) {
        return children;
    } else {
        return <Navigate to="/login" state={{ from: location }} />
    }
};

export default PrivateScreen;