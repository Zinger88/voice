import Axios from 'axios'

const instance = Axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://fancy-shortbread-a95d28.netlify.app',
    withCredentials: true,
})

export default instance
