import axios from "axios";


export const api = axios.create({
    baseURL:"http://localhost:3000"
})

export const postEmploye=async (formData)=>{
    return  await api.post("/api/employees",formData)
}
