const {Router} = require("express")
const axios = require('axios');
const { userModel } = require("../models/users.model");
const userController = Router();



userController.post("/fetch",async(req,res)=>{
    try{
        const {data:{results}} = await axios.get("https://randomuser.me/api/?results=60")
        const userData = results.map((el) => {
            return {
                name: `${el.name.title} ${el.name.first} ${el.name.last}` ,
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
        res.status(200).send({response:'User created successfully'})
    } catch (e) {
        console.log(e)
        res.status(501).send({response:'Internal server error'})
    }
})


module.exports = userController;