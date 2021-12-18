import { StyleSheet, View, StatusBar } from 'react-native';
import { NativeRouter, Routes, Route } from 'react-router-native';
import AuthProvider from './app/Context/AuthProvider';
import BookInformation from './app/screens/Home/BookInformation';
import Home from './app/screens/Home/Home';
import ProfileScreen from './app/screens/Home/ProfileScreen';
import LoginScreen from './app/screens/LoginScreen';
import PrivateScreen from './app/screens/PrivateScreen';
import SignupScreen from './app/screens/SignupScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

export default function App() {
  return (
    <View style={styles.container}>

      <AuthProvider>
        <NativeRouter>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/home" element={<PrivateScreen><Home /></PrivateScreen>} />
            <Route path="/profile" element={<PrivateScreen><ProfileScreen /></PrivateScreen>} />
            <Route path="/book/:id" element={<PrivateScreen><BookInformation /></PrivateScreen>} />
          </Routes>
        </NativeRouter>
      </AuthProvider>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
