import axios from "axios";



const journalApi = axios.create({
    baseURL: 'https://journal-vue-8022b-default-rtdb.firebaseio.com'
})

console.log(process.env.NODE_ENV)

export default journalApi;