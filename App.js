import { StyleSheet, View, StatusBar } from 'react-native';
import { NativeRouter, Routes, Route } from 'react-router-native';
import AuthProvider from './app/Context/AuthProvider';
import BookInformation from './app/screens/Home/BookInformation';
import CartScreen from './app/screens/Home/CartScreen';
import Home from './app/screens/Home/Home';
import ProfileScreen from './app/screens/Home/ProfileScreen';
import PublishBook from './app/screens/Home/PublishBook';
import LoginScreen from './app/screens/LoginScreen';
import PrivateScreen from './app/screens/PrivateScreen';
import SignupScreen from './app/screens/SignupScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import PoemsScreen from './app/screens/Home/PoemsScreen';
import PublishPoem from './app/screens/Home/PublishPoem';

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
            <Route path="/cart" element={<PrivateScreen><CartScreen /></PrivateScreen>} />
            <Route path="/publish-new" element={<PrivateScreen><PublishBook /></PrivateScreen>} />
            <Route path="/publish-poem" element={<PrivateScreen><PublishPoem /></PrivateScreen>} />
            <Route path="/poems" element={<PrivateScreen><PoemsScreen /></PrivateScreen>} />
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
