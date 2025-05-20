// import '../style.css'
import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router"
import { byAdvertiser, deleteApartment, getAllApartments, getAllCategory, getAllCity, getFilterApartment } from "../../Api/Api"
import { Apartment } from "./Apartment"
import { Filter } from "../Filter"
import { TextField } from '@mui/material';
import swal from 'sweetalert'
import { useSelector } from "react-redux"


export const ApartmentsDetails = (props) => {
    const location = useLocation();
    const currentUser = useSelector(state => state.user.currentUser)
    let token = useSelector(state => state.user.token)
    const [apartments, setApartments] = useState([])
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    const [selects, setSelects] = useState({ city: 'city', category: 'category', countBed: -1, amountOfMoney: -1 })


    const handleDataFromInner = (dataFromInner) => {
        let i = cities.findIndex(c => c.name == dataFromInner)
        let j = categories.findIndex(c => c.name == dataFromInner)
        if (i >= 0 || dataFromInner == "city")
            setSelects({ ...selects, city: dataFromInner })
        else if (j >= 0 || dataFromInner == "category")
            setSelects({ ...selects, category: dataFromInner })
    };

    useEffect(() => {
        // if (props.user == "yes") {
        if(currentUser && location.pathname=='/myApartments'){
            
            byAdvertiser(currentUser ? currentUser._id : null, token)
                .then(a => {
                    setApartments(a.data)
                    // console.log('byAdvertiser',a.data);
                    
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            getAllApartments()
                .then(a => {
                    setApartments(a.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getAllCity()
            .then(c => {
                setCities(c.data)
            })
            .catch(err => {
                console.log(err)
            })
        getAllCategory()
            .then(c => {
                setCategories(c.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    useEffect(() => {
        if (props.user == undefined) {
            getFilterApartment(selects)
                .then(a => {
                    setApartments(a.data);
                })
                .catch(err => console.log(err));
        }
    }, [selects]);

    const handleSetCountBed = (e) => {
        setSelects({ ...selects, countBed: e.target.value != '' ? e.target.value : -1 })
    }
    const handlesetAmountOfMoney = (e) => {
        setSelects({ ...selects, amountOfMoney: e.target.value != '' ? e.target.value : -1 })
    }

    const deleteCurrentApartment = (apartmentId) => {
        deleteApartment(currentUser._id, apartmentId, token)
            .then(a => {
                swal(`בוצעה בהצלחה מחיקת דירה`, 'success');
                setApartments(prevApartments => prevApartments.filter(x => x._id !== apartmentId)); // עדכון המצב
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    return <>
        <div className="container">
            {props.user == undefined && <div className="filter" id="filters">
                <Filter f={cities} category={"ערים"} onSendData={handleDataFromInner}></Filter>
                <Filter f={categories} category={"קטגוריות"} onSendData={handleDataFromInner}></Filter>
                <TextField className="custom-textfield"
                    id="outlined-basic" label="בחר כמות" type='number'
                    variant="outlined" onChange={(e) => handleSetCountBed(e)} />
                <TextField className="custom-textfield"
                    id="outlined-basic" label="בחר סכום" type='number'
                    variant="outlined" onChange={(e) => handlesetAmountOfMoney(e)} />
            </div>}
            <div className="apartments">
                {/* {console.log(apartments)} */}
                
                {apartments && apartments.map(a =>
                    <Apartment key={a._id} a={a} deleteApartment={deleteCurrentApartment} user={"yes"}></Apartment>)}
            </div>
            <Outlet></Outlet>
        </div>
    </>
}