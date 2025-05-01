import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;  // ✅ Correct backend port
axios.defaults.withCredentials = true;             // ✅ Send cookies (JWT)

export default axios;