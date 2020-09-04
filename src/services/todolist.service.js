import axios from "axios";

const API_URL = "/todolists/v1/todolist";

class TODOListService {
    newList(name, tasks, expirationDate) {
        return axios.post(
            API_URL,
            { name, tasks, expirationDate }
        );
    }
}

export default new TODOListService();
