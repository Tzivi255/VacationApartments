import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { TextField, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { createUser } from '../Api/Api';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setToken } from '../Redux/UserSlice';

export const SignIn = () => {
    const nav = useNavigate()
    let Dispatch = useDispatch()
    // preview-start
    const providers = [{ id: 'credentials', name: 'Email and Password' }];
    // preview-end

    const signIn = async (provider, formData) => {
        let user = {
            'email': formData.get('email'),
            'password': formData.get('password'),
            'phone': formData.get('phone'),
            'phone2': formData.get('phone2')
        }
        createUser(user).then(data => {
            Dispatch(setCurrentUser(data.data.user))
            Dispatch(setToken(data.data.token))
            alert("add advertiser")
            nav('/addApartment')
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    };
    const theme = useTheme();

    return <>
        <AppProvider theme={theme}>
            <Box component="form" onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
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
                <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    id="phone"
                    autoComplete="tel"
                />
                <TextField
                    fullWidth
                    name="phone2"
                    label="Phone 2 (Optional)"
                    id="phone2"
                    autoComplete="tel"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                    הרשמה
                </Button>
            </Box>
        </AppProvider>
    </>
}