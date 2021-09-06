import axios from "axios";



const journalApi = axios.create({
    baseURL: 'https://journal-vue-8022b-default-rtdb.firebaseio.com'
})



export default journalApi;