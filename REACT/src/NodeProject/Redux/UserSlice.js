import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: {},
    token: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { setCurrentUser, setToken } = userSlice.actions
export default userSlice.reducer