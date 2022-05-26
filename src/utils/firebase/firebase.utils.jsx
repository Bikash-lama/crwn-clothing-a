import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCziMyw3SZY---cy6uCf5W3ikegR1QI6FM",
    authDomain: "crwn-clothing-db-d9b4d.firebaseapp.com",
    projectId: "crwn-clothing-db-d9b4d",
    storageBucket: "crwn-clothing-db-d9b4d.appspot.com",
    messagingSenderId: "661454632294",
    appId: "1:661454632294:web:0527ae6b46bb76d2e004a7"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log("eror creating the user", error.message);
        }
    }

    return userDocRef;
}