import axios from 'axios';

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

let baseURL = "http://localhost:3000/api/v1"
if (!development)
    baseURL = "http://basicemployeedirectorywebapi.azurewebsites.net/api"


export default axios.create({
    baseURL
});