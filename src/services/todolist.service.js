import axios from "axios";

const API_URL = "/todolists/v1/todolist";

class TODOListService {
    newList(name) {
        return axios.post(
            API_URL,
            { name }
        );
    }
}

export default new TODOListService();
