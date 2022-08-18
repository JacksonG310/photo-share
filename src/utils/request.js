import axios from "axios";

const service = axios.create({
    baseURL: "/api"
})

service.interceptors.response.use(async(response) => {
    const { data: { success, message, data } } = await response;
    if (success) {
        return data
    }
    return Promise.reject(new Error(message));
})
export default service