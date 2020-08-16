import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "/todolists/v1/todolist";

class QuickViewService {
    getPagedTODOLists(page, resultsPerPage) {
        return axios.get(
            API_URL,
            {
                params:{
                    'page': page,
                    'results': resultsPerPage
                }
            }
        );
    }
}

export default new QuickViewService();
