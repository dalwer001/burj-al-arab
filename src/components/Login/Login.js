import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';




const Login = () => {

        const [loggedInUser,setLoggedInUser]=useContext(UserContext);
        let history = useHistory();
        let location = useLocation();

        let { from } = location.state || { from: { pathname: "/" } };
        

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const {displayName,email} = result.user;
            const signedInUser = {name: displayName,email}
            setLoggedInUser (signedInUser);
            console.log(signedInUser);
            history.replace(from);
                /** @type {firebase.auth.OAuthCredential} */
                var user = result.user;
                console.log(user);
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
                
            });
    }


    return (
        <div>
            <h1>This is Login.</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;