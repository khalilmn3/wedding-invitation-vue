import axios from 'axios'; 
const instance = axios.create({
    // baseURL: `http://192.168.1.101:9000`,
    baseURL: `https://antar-undangan.online:97898`,
    headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'content-type': 'application/x-www-form-urlencoded',
        // 'Authorization' : 'Bearer ' + localStorage.getItem('token'), 
        // 'X-CSRF-TOKEN' : token
    }
});

instance.interceptors.request.use(
    (request) => request,
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default instance;
