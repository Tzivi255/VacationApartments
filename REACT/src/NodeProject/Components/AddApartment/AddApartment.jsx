import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import './../../css.css';
import ImageUploadList from './uploadImages';
import AddExtras from './AddExtras';
import AddFromList from './AddFromList';
import { AppProvider } from '@toolpad/core/AppProvider';
import { creatCategory, createApartment, getCategories, getCities, updateApartment } from '../../Api/Api';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentEditApartment, setEditApartment } from '../../Redux/ApartmantSlice';

export const AddApartment = () => {
    let user = useSelector(state => state.user.currentUser);
    let token = useSelector(state => state.user.token);
    let apartmentData = useSelector(state => state.apartment.currentEditApartment)
    let editApartment = useSelector(state => state.apartment.editApartment)
    const theme = useTheme();
    const nav = useNavigate();
    let Dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [open, setOpen] = useState(false);
    const [currentCity, setCurrentCity] = useState();
    const [currentCategory, setCurrentCategory] = useState();
    const [imagess, setImagess] = useState([]);
    const [extrasAll, setExtrasAll] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    useEffect(() => {
        if (user.email == undefined) {
            nav(`/login`)
        }
        if (editApartment == true) {
            setFormData({
                name: apartmentData.name,
                description: apartmentData.description,
                category: apartmentData.category,
                city: apartmentData.city,
                address: apartmentData.address,
                bedsNum: apartmentData.bedsNum,
                extras: apartmentData.extras,
                price: apartmentData.price,

            });
            setCurrentCategory({ name: apartmentData.category.name, _id: apartmentData.category._id })
            setCurrentCity({ name: apartmentData.city.name, _id: apartmentData.city._id })
            if (apartmentData.images && apartmentData.images != []) {
                const formattedImages = apartmentData.images.map((img) => ({
                    file: null, // או אם יש לך מידע על הקובץ, הכנס אותו כאן
                    preview: img.data
                }));
                setImagess(formattedImages);
            }
            setExtrasAll(apartmentData.extras)
        }
    }, [])


    const handleChange = (e, name) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = () => {
        if (!currentCategory || !currentCity) {
            return;
        }
        if (currentCategory._id === -1) {
            creatCategory(currentCategory.name)
                .then(x => {
                    console.log("הצליח הוספת קטגוריה");
                })
                .catch(err => {
                    console.log("נכשל הוספת קטגוריה", err);
                });
        }
        setFormData(prev => ({
            ...prev,
            category: currentCategory._id,
            city: currentCity._id,
            extras: extrasAll
        }));

        const data = new FormData();
        const { name, description, category, city, address, bedsNum, extras, price } = formData;
        data.append('apartment', JSON.stringify({
            name, description, category: currentCategory._id, city: currentCity._id, address, bedsNum, extras: extrasAll, price,
            advertiser: user ? user._id : null
        }));

        imagess.forEach((img) => {
            data.append('images', img.file);
        });

        if (editApartment == false) {
            createApartment(data, token)
                .then(x => {
                    console.log("הוספת דירה הצליחה", x.data);
                })
                .catch(err => {
                    if (err.status === 401) {
                        alert("התנתקת, אתה מועבר להתחברות");
                        nav('/login');
                    }
                    console.log("הוספת דירה נכשלה", err);
                });
        }
        else {
            updateApartment(apartmentData._id, data, token)
                .then(x => {
                    console.log("עדכון דירה הצליחה", x.data);
                })
                .catch(err => {
                    if (err.status === 401) {
                        alert("התנתקת, אתה מועבר להתחברות");
                        nav('/login');
                    }
                    console.log("עדכון דירה נכשלה", err);
                });
        }
        Dispatch(setCurrentEditApartment({
            name: '', description: '', category: '', city: '', address: '',
            bedsNum: '', extras: [''], price: '', images: []
        }))
        setFormData({
            name: '', description: '', category: '', city: '', address: '',
            bedsNum: '', extras: [''], price: '', images: []
        })
        Dispatch(setEditApartment(true))
        Dispatch(setEditApartment(false))
        setOpen(false);
        nav(`/apartmentDetails`)    
    };

    return <>
        <AppProvider theme={theme}>
            <AddFromList list={categories} setList={setCategories} item={currentCategory} setItem={setCurrentCategory} name="קטגוריה" getList={getCategories}></AddFromList>
            <AddFromList list={cities} setList={setCities} item={currentCity} setItem={setCurrentCity} name="עיר" getList={getCities}></AddFromList>
            <TextField className='editDetails'
                label="שם" variant="outlined" placeholder="הכנס שם" value={formData.name} onChange={(e) => { handleChange(e, "name") }} />
            <TextField className='editDetails'
                label="תיאור"
                placeholder="הכנס תיאור"
                multiline
                value={formData.description}
                onChange={(e) => { handleChange(e, "description"); }}
            />
            <TextField className='editDetails'
                label="כתובת"
                placeholder="הכנס כתובת"
                multiline
                value={formData.address}
                onChange={(e) => { handleChange(e, "address"); }}
            />
            <TextField className='editDetails'
                label="מס' מיטות"
                placeholder="הכנס כמות מיטות"
                variant="outlined"
                type="number"
                value={formData.bedsNum}
                onChange={(e) => { handleChange(e, "bedsNum") }} />
            <TextField className='editDetails'
                label="מחיר"
                type="number"
                placeholder="הכנס מחיר"
                variant="outlined"
                value={formData.price}
                onChange={(e) => { handleChange(e, "price") }} />
            <ImageUploadList setList={setImagess} list={imagess}></ImageUploadList>
            <AddExtras extrasAll={extrasAll} setExtrasAll={setExtrasAll}></AddExtras>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, width: "80%", marginTop: "100vw" }} onClick={handleSave} className='editDetails'>
                שמירה
            </Button>
        </AppProvider> </>
}
