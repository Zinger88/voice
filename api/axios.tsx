import Axios from 'axios'


const instance = Axios.create({
    baseURL: process.env.serverPath,
    withCredentials: true,
})

export default instance
