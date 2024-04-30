import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from '../layout/AuthLayout'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'
import { useForm } from '../../hooks'
import { useMemo } from 'react';

const initialForm = {};

export const LoginPage = () => {
    const dispatch = useDispatch();
    const {status, errorMessage} = useSelector((state) => state.authReducer);

    const isAuthenticating = useMemo(() => status === 'checking', [status]) ;
    
    const {email, password, onInputChange} = useForm(initialForm);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(startLoginWithEmailPassword({email, password}));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout title='Login'>

            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container >
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@example.com"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            autoComplete="true"
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                        <Grid item sm={12} display={!!errorMessage ? '' : 'none'}>
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button type='submit' variant="contained" fullWidth disabled={isAuthenticating}>
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button onClick={onGoogleSignIn} variant="contained" fullWidth disabled={isAuthenticating}>
                                <Google />
                                <Typography sx={{ml: 1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Link component={RouterLink} color="inherit" to="/auth/register">
                            Crear una cuenta
                        </Link>
                        
                    </Grid>
                </Grid>
            </form>

        </AuthLayout>
    )
}