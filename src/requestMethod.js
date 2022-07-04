import axios from "axios";


const BASE_URL="http://c4f2.acsight.com:7770/api/system/"

export const publicRequest=axios.create({
    baseURL:BASE_URL,
})
