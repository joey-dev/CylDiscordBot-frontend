import axios from 'axios';

const baseURL = "http://localhost:8080/api";

const AxiosConfig = (contentType: string = 'application/json') => {
    let Axios = axios.create({baseURL});

    let token: string | null = "UYmA0fVuTuVeXW5gsjSQWGJL347rb4";
    let userId: string | null = "214507099093204992";

    if (typeof window !== "undefined") {
        token = localStorage.getItem('token');
        userId = localStorage.getItem('userId');
    }

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
