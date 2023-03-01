import axios from 'axios'

export default axios.create({
    baseURL:'http://localhost:3333/users'
    // baseURL:'https://cointab-assignment-theta.vercel.app/users'
})

