import axios from "axios";


export const api = axios.create({
    baseURL:import.meta.env.VITE_URL
})

export const postEmploye=async (formData)=>{
    return  await api.post("/api/employees",formData)
}
