import axios from "axios";



const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params:{
        key: 'AIzaSyAmtLilPsYWjqOjOhaWkSogvqqr6I9NQkg'
    }
})

console.log(process.env.NODE_ENV)

export default authApi;