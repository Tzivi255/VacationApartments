import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    currentEditApartment: {},
    editApartment:false
}

const apartmentSlice = createSlice({
    name: 'apartment',
    initialState,
    reducers: {
        setCurrentEditApartment: (state, action) => {
            state.currentEditApartment = action.payload
        },
        setEditApartment:(state,action)=>{
            state.editApartment=action.payload
        }
    }
})

export const { setCurrentEditApartment, setEditApartment } =apartmentSlice.actions
export default apartmentSlice.reducer