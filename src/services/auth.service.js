import axios from "axios";
import qs from "qs";

const API_URL = "/security/v1/oauth/token";
const USER_API_URL = "/account/v1/register";

class AuthService {
  login(username, password) {
    return axios
      .post(
        API_URL,
        qs.stringify({
          username,
          password,
          grant_type: "password",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic bW9iaWxlYXBwOjEyMzQ1",
            "Cache-Control": "no-cache",
          },
        }
      )
      .then((response) => {
        if (response.data.access_token) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem("user");
  }

  register(username, email, password, name, lastName, passwordConfirmation) {
    return axios.post(
      USER_API_URL,
      {
        username,
        email,
        password,
        name,
        lastName,
        passwordConfirmation,
      },
      {
        headers: {
          Authorization: "Basic bW9iaWxlYXBwOjEyMzQ1",
        },
      }
    );
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }
}

export default new AuthService();
