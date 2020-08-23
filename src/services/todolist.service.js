import axios from "axios";

const API_URL = "/todolists/v1/todolist";

class TODOListService {
    newList(name, tasks) {
        return axios.post(
            API_URL,
            { name, tasks }
        );
    }
}

export default new TODOListService();
