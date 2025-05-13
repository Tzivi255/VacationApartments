import * as React from 'react';
// import './style.css'
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { Apartment } from '@mui/icons-material';
import { Outlet, Route, Routes, useNavigate } from "react-router"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ApartmentsDetails } from './Apartment/ApartmentsDetails';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { byAdvertiser } from '../Api/Api';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import LocationCityIcon from '@mui/icons-material/LocationCity';

export const Home = (props) => {
    let nav = useNavigate()
    let user = useSelector(state => state.user.currentUser)
    let token = useSelector(state => state.user.token)
    let editApartment = useSelector(state => state.apartment.editApartment)

    const [advertiserApartment, setAdvertiserApartment] = React.useState([])
    const navigate = useNavigate();
    React.useEffect(() => {
        byAdvertiser(user._id, token)
            .then(data => {
                setAdvertiserApartment(data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [user, editApartment])

    const NAVIGATION = [

        {
            segment: 'apartmentDetails',
            title: 'קטלוג דירות',
            icon: <Apartment />,
        },
        {
            segment: 'signIn',
            title: 'הרשמה',
            icon: <AccountCircleIcon />,
        },
        {
            segment: 'login',
            title: 'התחברות',
            icon: <LoginIcon />,
        },
        {
            kind: 'divider',
        },

        {
            segment: 'addApartment',
            title: 'הוספת דירה',
            icon: <DomainAddIcon />,

        },
        {
            segment: 'myApartments',
            title: 'הדירות שלי',
            icon: <LocationCityIcon />,
        },
    ];

    const demoTheme = extendTheme({
        direction: 'rtl',
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: 'class',
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
    });

    function useDemoRouter(initialPath) {
        const [pathname, setPathname] = React.useState(initialPath);

        const router = React.useMemo(() => {
            return {
                pathname,
                searchParams: new URLSearchParams(),
                navigate: (path) => {
                    setPathname(String(path))
                    navigate(`${path}`);
                },

            };
        }, [pathname]);

        return router;
    }

    const Skeleton = styled('div')(({ theme, height }) => ({
        backgroundColor: theme.palette.action.hover,
        borderRadius: theme.shape.borderRadius,
        height,
        content: '" "',
    }));

    const { window } = props;

    const router = useDemoRouter('/toolpad');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window ? window() : undefined;

    return <>
        <ThemeProvider theme={demoTheme}>
            <AppProvider
                navigation={NAVIGATION}
                branding={{
                    logo: <img src="./pics/לוגו.png" alt="apartment logo" style={{ width: '40px', height: 'auto', marginLeft: '150px' }} />,
                    title: 'דירונופש',
                    homeUrl: '/',
                }}
                router={router}
                theme={demoTheme}
                window={demoWindow}
            >

                <DashboardLayout>
                    <PageContainer>
                        <Outlet></Outlet>
                    </PageContainer>
                </DashboardLayout>
            </AppProvider>
        </ThemeProvider>

    </>

}

