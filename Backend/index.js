const express = require('express')
const app = express()
const Speech2Text = require('./routes/Speech2Text/Speech2Text')
const GetData = require('./routes/data/GetData')
const Register = require('./routes/Auth/Register')
const Login = require('./routes/Auth/Login')
const CreateData = require('./routes/data/CreateData')
const alterData = require('./routes/Auth/alterData')

//setup

//routes
app.use('/speech', Speech2Text)

app.post('/getData', GetData)

app.post('/register', Register)

app.post('/login', Login)

app.post('/createData', CreateData)

app.post('/alterData', alterData)


module.exports = app