//Adding Base URL RESTapi
import axios from "axios";

export default axios.create({
    baseURL: "https://sangoshthee.cdac.in",
    headers: {
        "Access-Allow-Control-Origin": "*",
        "Content-type": "application/json"
    }
});