import { useMemo, useState } from 'react'
import {Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'




const formDate = {
    email: '',
    password: '',
    displayName: ''
}
//De manera dinámica se envian las validaciones como un objeto al hook del form:
const formValidations = {
    email: [ (value) => value.includes('@') ,'El correo debe tener una @'],
    password: [(value) => value.length >= 6, 'El password debe tener más de 6 letras'],
    displayName: [(value) => value.trim().length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {
    const dispatch = useDispatch();
    
    const {status, errorMessage} = useSelector((state) => state.authReducer);
    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const {
        formState, email, password, displayName, onInputChange,
        isFormValid, emailValid, passwordValid, displayNameValid
    } = useForm(formDate, formValidations);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if(!isFormValid) return;
        
        dispatch(startCreatingUserWithEmailPassword(formState));
    }

    return (
        <AuthLayout title="Crear cuenta">
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Nombre completo"
                            placeholder="Nombre completo"
                            type="text"
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}/>
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Correo"
                            placeholder="correo@example.com"
                            type="email"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}/>
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Contraseña"
                            placeholder="Contraseña"
                            type="password"
                            fullWidth
                            autoComplete="true"
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mt: 1, mb: 2}}>
                        <Grid item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error'>{errorMessage}</Alert> 
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth type='submit' disabled={isAuthenticating}>Crear cuenta</Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{mr: 1}}>¿Ya tienes una cuenta?</Typography>
                        <Link component={RouterLink} to="/auth/login" color="inherit">
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}