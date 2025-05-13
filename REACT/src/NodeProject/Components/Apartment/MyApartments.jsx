import { useSelector } from "react-redux"
import { Apartment } from "./Apartment"
import { ApartmentsDetails } from "./ApartmentsDetails"
import { use, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

export const MyApartments = () => {
    let nav = useNavigate()
    let currentUser = useSelector(state => state.user.currentUser)
    useEffect(() => {
        if (currentUser.email == undefined) {
            nav("/login")
        }
    }, [])
    return <>
        <ApartmentsDetails user={"yes"}></ApartmentsDetails>
        <Outlet></Outlet>
    </>
}
export default MyApartments