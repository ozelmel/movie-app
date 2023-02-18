import { initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth
} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// console firebase - project settings
// firebase console settings -- firebaseconfig
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
//? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
export const createUser = async (email, password, navigate) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential)
        navigate("/");

    } catch (error) {
        console.log(error);
    }
};
//! Email-password ile girişi enable yap
export const signIn = async (email, password, navigate) => {
    try {
        let userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        console.log(userCredential);

    } catch (error) {
        console.log(error);
    }

}