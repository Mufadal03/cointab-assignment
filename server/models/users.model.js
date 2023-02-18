const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  profilePic: { type: String, required: true },
})

const userModel = mongoose.model('cointab-user', userSchema)

module.exports = { userModel }