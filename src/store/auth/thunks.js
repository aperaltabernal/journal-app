import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase";
import { checkingCredentials, login, logout } from "./"

export const startCheckingCredentials = () => {
    return (dispatch, getState) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        console.log("result", result)
        if(!result.ok) return dispatch(logout({errorMessage: result.errorMessage}));

        dispatch(login(result));
        
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch, getState) => {
        dispatch(checkingCredentials());
        
        const result = await registerUserWithEmailPassword({email, password, displayName})
        if(!result.ok) return dispatch(logout({errorMessage: result.errorMessage}));
        dispatch(login(result));
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch, getState) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword(email, password);
        if(!result.ok) return dispatch(logout({errorMessage: result.errorMessage}));
        dispatch(login(result));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(logout())
    }
}