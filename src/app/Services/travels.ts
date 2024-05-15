import axios from 'axios'
import { TravelProps } from '../Utils/types'


export async function getTravelById(id: number) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            
        }
    }
    let url = `https://127.0.0.1:8000/api/av/travel/${id}`
    

    return axios.get(url, axiosConfig).then((res) => {
        return res.data
    })
}