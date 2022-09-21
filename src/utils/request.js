import axios from "axios";

const url = '/api'
    // const url = process.env.NODE_ENV === 'production' ? '/' : 'http://127.0.0.1:8080'

const service = axios.create({
    baseURL: url
})

service.interceptors.response.use(async(response) => {
    const { data: { success, message, data } } = await response;
    console.log('success', success);
    if (success) {
        return data
    }
    return Promise.reject(new Error(message));
})
export default service