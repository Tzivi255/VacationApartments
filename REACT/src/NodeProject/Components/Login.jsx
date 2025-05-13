import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import './style.css'
import { login } from '../Api/Api';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setToken } from '../Redux/UserSlice';
import Typography from '@mui/material/Typography';
import { Box, Button, TextField } from '@mui/material';
import SendEmailPass from './sendEmailPass';



export const Login = () => {
    const [email, setEmail] = React.useState('');   
    const nav = useNavigate()
    let Dispatch = useDispatch()
    const providers = [{ id: 'credentials', name: 'Email and Password' }];
    const BRANDING = {
        logo: (
            <img
                src="./pics/לוגו2.png"
                alt="apartment logo"
                style={{ height: 24 }}
            />
        ),
        slots: {
            title: () => <Typography variant="h5">ששש</Typography>, // שינוי הכותרת
            subtitle: () => <Typography variant="body2">ששש</Typography>, // שינוי התת-כותרת
        }
    };

    const signIn = async (provider, formData) => {
        let user = {
            'email': formData.get('email'),
            'password': formData.get('password')
        }
        // פה צריך להוסיף את כל הלוגיקה וליצור טוקן
        login(user).then(data => {
            Dispatch(setCurrentUser(data.data.user))
            Dispatch(setToken(data.data.token))
            nav('/myApartments')
        }).catch(err => {
            if (err.status == 401) {
                alert("אתה לא רשום ומועבר להרשמה")
                nav('/signIn')
            }
            console.log(err);
        })
    };

    const theme = useTheme();

    return <>
        <AppProvider theme={theme}>
            <Box component="form" onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget); // ודא שהשורה הזו כאן
                signIn(providers[0], formData);
            }} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => {setEmail(e.target.value)                        
                    }}
                />
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                 {email && <SendEmailPass email={email}></SendEmailPass>}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                    Sign In
                </Button>
            </Box>
        </AppProvider>
    </>
}