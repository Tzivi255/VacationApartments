import axios from "axios"

axios.defaults.baseURL = `http://localhost:3000/`

export const resetPassword = (advertiserEmail) => {
    return axios.get(`advertiser/resetPassword/${advertiserEmail}`)
}
export const updatePassword=(pass,email,token)=>{
    return axios.patch(`advertiser/updatePass`,  {
        password: pass,
        email: email
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    });
}

export const getAllApartments = () => {
    return axios.get('apartment')
}

export const getFilterApartment = (select) => {
    return axios.post('apartment/filter/allFilter', select)
}

export const getAllCity = () => {
    return axios.get('city')
}

export const getAllCategory = () => {
    return axios.get('category')
}

export const login = (user) => {
    return axios.post('advertiser/login', user)
}

export const createUser = (user) => {
    return axios.post('advertiser', user)
}

export const byAdvertiser = (id, token) => {
    return axios.get(`apartment/byAdvertiser/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    })
}

export const deleteApartment = (id, apartmentId, token) => {
    return axios.delete(`apartment/${id}/${apartmentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    })
}

export const createApartment = (apartment,token) => {
    return axios.post(`apartment`, apartment,{
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data' 
        },
      })
}
    

export const getApartments = (apartment) => {
    return axios.get(`apartment`, apartment)
}

export const updateApartment = (apartmentId, data,token) => {
    return axios.patch(`apartment/${apartmentId}`, data,{
        headers: {
          Authorization: `Bearer ${token}`,  
          'Content-Type': 'multipart/form-data' 
        },
      })
}


export const getCities = () => {
    return axios.get(`city`)
}

export const creatCity = (name) => {
    return axios.post(`city`,{"name":name})
}

export const getCategories = () => {
    return axios.get(`category`)
}

export const creatCategory = (name) => {
    return axios.post(`category`,{"name":name})
}