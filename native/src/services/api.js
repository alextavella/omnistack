import axios from 'axios'

const BASE_FOR_IOS_SIMULATOR = 'http://localhost:3333' // for simulator iOS
const BASE_FOR_ANDROID_SIMULATOR = '10.0.2.2:3333' // for simulador Android
const BASE_FOR_DEVICE = '10.116.215.24:3333' // for device

const api = axios.create({
    baseURL: BASE_FOR_IOS_SIMULATOR
})

export default api