import { Route, Routes } from "react-router"
import { Home } from "../Components/Home"
import { Login } from "../Components/Login"
import { SignIn } from "../Components/SignIn"
import { ApartmentsDetails } from "../Components/Apartment/ApartmentsDetails"
import { Apartment } from "../Components/Apartment/Apartment"
import { AddApartment } from "../Components/AddApartment/AddApartment"
import { Gallery } from "../Components/Apartment/Gallery"
import MyApartments from "../Components/Apartment/MyApartments"


export const Routing = () => {
    return <>
        <Routes>
            <Route path="" element={<Home></Home>}>
                <Route path="" element={<ApartmentsDetails></ApartmentsDetails>}>
                    <Route path="apartment" element={<Apartment></Apartment>}></Route>
                </Route>
                <Route path="apartmentDetails" element={<ApartmentsDetails></ApartmentsDetails>}>
                    <Route path="apartment" element={<Apartment></Apartment>}></Route>
                </Route>
                <Route path="advertiserApartment/apartment" element={<Apartment></Apartment>}></Route>
                <Route path="login" element={<Login></Login>}></Route>
                <Route path="signIn" element={<SignIn></SignIn>}></Route>
                <Route path="addApartment" element={<AddApartment></AddApartment>}></Route>
                <Route path="gallery" element={<Gallery></Gallery>}></Route>
                <Route path="myApartments" element={<MyApartments></MyApartments>}></Route>

            </Route>
            {/* <Route path="apartmentDetails" element={<ApartmentsDetails></ApartmentsDetails>}>
                <Route path="apartment" element={<Apartment></Apartment>}></Route>
            </Route> */}
            <Route path="" element={<Home></Home>}></Route>
        </Routes>
    </>
}