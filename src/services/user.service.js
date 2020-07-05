import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8090/api/users/v1/";

class UserService {
    getAllUSers() {
        return axios.get(API_URL, {headers: authHeader() });
    }
}

export default new UserService();