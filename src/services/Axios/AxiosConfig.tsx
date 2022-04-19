import axios from 'axios';

const baseURL = "http://localhost:8080/api";

const AxiosConfig = (contentType: string = 'application/json') => {
    let Axios = axios.create({baseURL});

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token) {
        Axios = axios.create({
            baseURL,
            headers: {
                'Authorization': 'Bearer ' + token,
                'user-id': '' + userId,
                'Content-Type': contentType,
            },
        });
    }

    return Axios;
};

export default AxiosConfig;
