import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import apartmantReducer from "./ApartmantSlice"


const store = configureStore({
    reducer: {
        user: userReducer,
        apartment:apartmantReducer

    }
})

export default store