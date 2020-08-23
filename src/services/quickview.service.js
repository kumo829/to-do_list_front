import axios from "axios";

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
