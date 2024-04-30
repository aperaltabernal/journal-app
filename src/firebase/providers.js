import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        
        const {displayName, email, photoURL, uid} = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    try {
        
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid} = result.user;
        //Actualizar displayName en firebase
        await updateProfile(result.user, {
            displayName
        });

        return {
            ok: true,
            uid,
            email,
            displayName,
            photoURL: null
        }

        
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async(email, password) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);    
        const {uid, displayName, photoURL} = result.user;
        return {
            ok: true,
            uid,
            email,
            displayName,
            photoURL
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}