import axios from "axios";

const backendApiBase = (withAuth = false) => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': withAuth && localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '',
    },
});


export default backendApiBase;
