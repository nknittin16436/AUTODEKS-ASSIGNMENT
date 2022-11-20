import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors, loginGoogleUser } from '../../action/userAction';
import { useAlert } from "react-alert";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script'
import isEmail from 'validator/es/lib/isEmail';
import isStrongPassword from 'validator/es/lib/isStrongPassword';
const clientId = "523562066484-54i9uk4u8nha2n2m56h824upsabucti3.apps.googleusercontent.com"

const theme = createTheme();


const Login = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, isAuthenticated } = useSelector((state) => state.user);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (validateData(data.get('email'), data.get('password'))) {
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });
            dispatch(login(data.get('email'), data.get('password')));
        }

    };

    const validateData = (email, password) => {
        if (!isEmail(email)) {
            alert.error("Invalid Email Id");
            return false;
        }
        if (!isStrongPassword(password)) {
            alert.error("Password Should contain One upper case,one lower case,one number and one special character and atleast 8 characters long");
            return false;
        }

        return true;
    }


    useEffect(() => {

        gapi.load("auth2", () => {
            gapi.auth2.init({ client_id: clientId })
        })
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/');
        }
    }, [error, alert, isAuthenticated]);


    const onSuccess = async (res) => {
        const { name, email } = res.profileObj;
        dispatch(loginGoogleUser(name, email))
    };
    const onFailure = (res) => {
        console.log(res);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <GoogleLogin
                                    clientId={`523562066484-54i9uk4u8nha2n2m56h824upsabucti3.apps.googleusercontent.com`}
                                    onSuccess={onSuccess}
                                    buttonText="Login with Google"
                                    onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;