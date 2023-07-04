import { create } from 'apisauce'

const apiClient = create({
    baseURL:'http://192.168.0.78:3005'
})

export default apiClient;