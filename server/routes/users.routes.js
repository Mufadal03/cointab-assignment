const { Router } = require("express")
const axios = require('axios');
const { userModel } = require("../models/users.model");
const userController = Router();


// FETCH DATA TO STORE IN THE DATABASE
userController.post("/fetch", async (req, res) => {
    try {
        const { data: { results } } = await axios.get("https://randomuser.me/api/?results=60")
        const userData = results.map((el) => {
            return {
                name: `${el.name.title} ${el.name.first} ${el.name.last}`,
                gender: el.gender,
                city: el.location.city,
                state: el.location.state,
                country: el.location.country,
                email: el.email,
                age: el.dob.age,
                profilePic: el.picture.large
            }
        })
        await userModel.deleteMany({})
        await userModel.insertMany(userData)
        res.status(200).send({ response: 'User created successfully' })
    } catch (e) {
        console.log(e)
        res.status(501).send({ response: 'Internal server error' })
    }
})

//GET DATA WITH FILTERATION AND PAGINATION
userController.get('/', async (req, res) => {
    const { page = 1, limit = 10, username, gender, city, state, country, age_gte, age_lte } = req.query
    const filter = {}
    username && (filter.name = { $regex: username, $options: 'i' })
    gender && (filter.gender = gender)
    city && (filter.city = gender)
    state && (filter.state = state)
    country && (filter.country = country)
    age_gte && (filter.age = { '$gte': age_gte })
    age_lte && (filter.age = { '$lte': age_lte })
    age_gte && age_lte && (filter.age = { '$gte': age_gte, '$lte': age_lte })

    try {
        const totalLen = await userModel.find(filter).count()
        const data = await userModel.find(filter).skip((page - 1) * limit).limit(limit)
        res.status(200).send({ response: data, totalData: totalLen })
    } catch (error) {
        res.status(501).send({ response: 'Internal server Error' })
    }
})

//DELETE ALL USERS FROM DATABASE
userController.delete('/delete', async (req, res) => {
    try {
        await userModel.deleteMany({})
        res.status(200).send({ response: 'Users deleted successfully' })
    } catch (error) {
        res.status(501).send({ response: 'Internal server error' })
    }
})

module.exports = userController;