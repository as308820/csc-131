import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';  // ✅ Correct backend port
axios.defaults.withCredentials = true;             // ✅ Send cookies (JWT)

export default axios;