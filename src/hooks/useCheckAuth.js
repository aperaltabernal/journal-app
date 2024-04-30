import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
    const {status} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        //Observable que está pendiente de si el usuario ha cambiado o no
        onAuthStateChanged(FirebaseAuth, async(user) => {
            console.log('onAuthStateChanged')
            if(!user) return dispatch(logout());
            const {displayName, email, photoURL, uid} = user;
            dispatch(login({displayName, email, photoURL, uid}));
            dispatch(startLoadingNotes());
        })
    }, []);

    return {
        status
    }
}