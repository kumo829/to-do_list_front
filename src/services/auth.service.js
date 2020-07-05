import axios from "axios";
import qs from "qs";

const API_URL = "http://localhost:8090/api/security/v1/oauth/token";
const USER_API_URL = "http://localhost:8090/api/users/v1/users";

class AuthService {
    login(username, password){
        return axios.post(API_URL, 
            qs.stringify({
            username, password, grant_type: "password"
        }), 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic bW9iaWxlYXBwOjEyMzQ1',
                'Cache-Control': 'no-cache'
            }
        })
        .then(response => {

            if(response.data.access_token){
                sessionStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout(){
        sessionStorage.removeItem("user");
    }

    register(username, email, password, name){
        return axios.post(USER_API_URL, {
            username, email, password, name
        }, {
            headers: {
                'Authorization': 'Basic bW9iaWxlYXBwOjEyMzQ1'
            }
        })
    }

    getCurrentUser(){
        return JSON.parse(sessionStorage.getItem("user"));
    }
}

export default new AuthService();