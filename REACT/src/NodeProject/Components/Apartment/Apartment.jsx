import { AspectRatio, Button, Card, CardContent, Chip, DialogActions, DialogContent, DialogTitle, ThemeProvider } from "@mui/joy"
import React, { useEffect, useState } from "react";
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import { createTheme, IconButton } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteApartment } from "../../Api/Api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert'
import { Gallery } from "./Gallery";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListIcon from '@mui/icons-material/List';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Grid, Box, Typography } from '@mui/material';
import { setCurrentEditApartment, setEditApartment } from "../../Redux/ApartmantSlice";


export const Apartment = (props) => {
    const nav = useNavigate()
    let Dispatch = useDispatch()
    let currentUser = useSelector(state => state.user.currentUser)
    const location = useLocation();
    const a = props.a
        || location.state?.apartment
        || {};
    const [confirmOpen, setConfirmOpen] = useState(false);

    const imageSrc = a.image ? `data:${a.image.contentType};base64,${a.image.data.toString('base64')}` : '';

    const [open, setOpen] = useState(false);

    const handleClickOpen = (a) => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };

    const deleteCurrentApartment = () => {
        props.deleteApartment(a._id)
    };

    const handleConfirmDelete = () => {        
        props.deleteApartment(a._id);
        setConfirmOpen(false); // סוגר את הדיאלוג
    };

    const handleCancelDelete = () => {
        setConfirmOpen(false);
    };
    const handleDeleteClick = () => {
        swal({
            title: "אישור מחיקה",
            text: "האם אתה בטוח שברצונך למחוק את הדירה הזו?",
            icon: "warning",
            buttons: ["ביטול", "מחק"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                handleConfirmDelete();
                setEditApartment(true)
                setEditApartment(false)
            } else {
                handleCancelDelete();
            }
        });

    };
    const handleEditClick = () => {
        Dispatch(setCurrentEditApartment(a))
        Dispatch(setEditApartment(true))
        nav('/AddApartment')
    }
    const theme = createTheme({
    });
    return <>
        <ThemeProvider theme={theme}>

            <div className="apartment">
                <Card sx={{ width: 320 }}>
                    <Chip size="sm" variant="outlined" color="neutral">
                        {a.category && a.category.name}
                    </Chip>
                    <div>
                        <Typography level="title-lg">{a.description && a.description}</Typography>
                        <Typography level="body-sm">{a.city && a.city.name && a.address && `${a.city.name} - ${a.address}`}</Typography>
                        <Typography level="body-sm">{a.bedsNum && `${a.bedsNum} :מיטות`}</Typography>
                    </div>
                    <AspectRatio minHeight="120px" maxHeight="200px">
                        <Gallery apartment={a}></Gallery>
                    </AspectRatio>
                    <CardContent orientation="horizontal">
                        {( (location.pathname=='/myApartments')) && <IconButton aria-label="delete" size="large"
                            onClick={handleEditClick}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>}
                        {( (location.pathname=='/myApartments')) && <IconButton aria-label="delete" size="large"
                            onClick={handleDeleteClick}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>}

                        <div>
                            <Typography level="body-xs">:מחיר ללילה</Typography>
                            <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>{a.price && `₪${a.price}`} </Typography>
                        </div>
                        <br></br>
                        <Button onClick={() => handleClickOpen(a)}
                            variant="solid"
                            size="md"
                            color="primary"
                            aria-label="Explore Bahamas Islands"
                            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                        >
                            לפרטים נוספים
                        </Button>

                    </CardContent>
                </Card>
            </div>
            <React.Fragment>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    classes={{ paper: 'custom-dialog' }}
                    id='www'
                >
                    <DialogTitle id="alert-dialog-title" className="dialog-title">
                        <br></br>
                    </DialogTitle>
                    <DialogContent className="dialog-content">
                        <DialogContentText id="alert-dialog-description">
                            <Gallery apartment={a} />
                            <Box className="box-content" mt={2}>
                                <div style={{ fontWeight: 'bold', marginTop: '-100px' }}>
                                    {a.category && a.category.name}
                                    <br />
                                    {a.description && a.description}
                                    <br />
                                    <br />
                                </div>
                                <Grid container spacing={1}>
                                    {a.city && a.city.name && a.address && (
                                        <Grid item xs={12} className="dialog-item">
                                            {`${a.city.name} - ${a.address}`}<LocationOnIcon />
                                        </Grid>
                                    )}
                                    {a.bedsNum && (
                                        <Grid item xs={12} className="dialog-item">
                                            {`${a.bedsNum} מיטות`}<HotelIcon style={{ marginLeft: '8px' }} />
                                        </Grid>
                                    )}
                                    {a.price && (
                                        <Grid item xs={12} className="dialog-item">
                                            {`מחיר ללילה: ₪${a.price}`}<AttachMoneyIcon style={{ marginLeft: '8px' }} />
                                        </Grid>
                                    )}
                                    {a.extras && a.extras.length > 0 && (
                                        <Grid item xs={12} className="dialog-item">
                                            {`תוספים: ${a.extras.join(', ')}`} <ListIcon style={{ marginLeft: '8px' }} />
                                        </Grid>
                                    )}
                                    {a.advertiser && (
                                        <>
                                            <Grid item xs={12} className="dialog-item">
                                                {`מייל: ${a.advertiser.email}`}<EmailIcon style={{ marginLeft: '8px' }} />
                                            </Grid>
                                            <Grid item xs={12} className="dialog-item">
                                                {`טלפון: ${a.advertiser.phone}`}<PhoneIcon style={{ marginLeft: '8px' }} />
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus className="dialog-button" style={{ margin: '30px 50px 30px 50px', marginBottom: '30px' }}>
                            חזור
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
        <Outlet></Outlet>
    </>
}