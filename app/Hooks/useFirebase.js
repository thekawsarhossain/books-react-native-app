import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

// firebase initialization function called here 
initializeAuthentication();

const useFirebase = () => {

    // states are here 
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // auth and providers here 
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // create user with email and password here 
    const createUser = (name, email, password, navigate) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                updateUserProfile(name);
                setUser(result.user);
                setError('');
                navigate('/home');
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }

    // sign in existing user here 
    const signIn = (email, password, navigate) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                setError('');
                navigate('/home');
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }

    // getting the current user here 
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setError('')
            } else { setUser({}) }
            setLoading(false);
        });
    }, [auth])

    // update user profile || name here 
    const updateUserProfile = name => {
        setLoading(true);
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => { })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }


    // google sign in here 
    const signInWithGoogle = navigate => {
        setLoading(true)
        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result.user);
                setError('');
                navigate("/home");
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false))
    }

    // log out user here 
    const logoutUser = () => {
        signOut(auth)
            .then(() => console.log('successfullll'))
            .catch(error => setError(error.message))
    }

    // returning here all the necessary things
    return {
        user,
        error,
        setUser,
        setError,
        createUser,
        signIn,
        loading,
        logoutUser,
        signInWithGoogle,
    }
}

export default useFirebase;