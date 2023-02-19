import {
    initializeApp
} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signOut,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail
} from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/ToastNotify";

// TODO: Replace the following with your app's Firebase project configuration
//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! firebase console settings bölümünden firebaseconfig ayarlarını al
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
export const createUser = async (email, password, navigate, displayName) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(auth, email, password);
        //? kullanıcı profilini güncelleyen firebase metodu
        await updateProfile(auth.currentUser, {
            displayName: displayName,
        })

        console.log(userCredential)
        toastSuccessNotify("Registered Succesfully!")
        navigate("/");

    } catch (err) {
        toastErrorNotify(err.message);
    }
};
//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Email/password ile girişi enable yap
export const signIn = async (email, password, navigate) => {
    try {
        let userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        toastSuccessNotify("Registered Succesfully!")
        // sessionStorage.setItem("user", JSON.stringify(userCredential.user))
        console.log(userCredential);

    } catch (err) {
        toastErrorNotify(err.message);
    }

}
//? kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu..

export const userObserver = (setCurrentUser) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user)
        } else {
            setCurrentUser(false);

        }
    });
}

export const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged Out Succesfully!")
    
}
//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Google ile girişi enable yap

export const signUpProvider = (navigate) => {
    //? google ile giriş yapılması için kullanılan firebase metodu
    const provider = new GoogleAuthProvider();
    //? açılır pencere ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result)
            navigate("/");
            toastSuccessNotify("Logged in Succesfully!")

        }).catch((err) => {
            toastErrorNotify(err.message);

        });
        

}

export const forgotPassword = (email) => {
    //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            toastWarnNotify("Please check your mail box!");
            // alert("Please check your mail box!");
        })
        .catch((err) => {
            toastErrorNotify(err.message);
            // alert(err.message);
            // ..
        });
}