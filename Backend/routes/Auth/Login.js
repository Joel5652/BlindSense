const express = require('express');
const router = express.Router()
const crypto = require('crypto');
const db = require('../DataBaseConnection');
const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config()

router.use(express.json())

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }

router.use('/', (req, res) => {
    const username = req.body.username;
    const hashingSecret = username;
    const password = crypto.createHmac('sha256', hashingSecret)
                        .update(req.body.password)
                        .digest('hex');
    
    const UserSearch = "SELECT * FROM Users WHERE UserID = ?"
    const UserSearchQuery = mysql.format(UserSearch,[username])

    const PasswordSearch = "SELECT EncodedPassword FROM Users WHERE UserID = ?"
    const PasswordSearchQuery = mysql.format(PasswordSearch,[username])

    db.getConnection( async (err, connection) => {
        if (err) throw (err)             
        
        //user exists
        await connection.query(UserSearchQuery, async (err,result)=>{
            if (err) throw (err)

            if(result.length === 0){
                console.log('User does not exist');
                res.sendStatus(409)
            } else {
                console.log('User exists');
                const UniqueID = result[0].ID
                
                await connection.query(PasswordSearchQuery, (err, result) => {
                    if(password == result[0].EncodedPassword){
                        connection.release()
                        console.log('User authenticated');
                        const token = generateAccessToken({ username: username, ID: UniqueID, password: req.body.password });
                        res.json(token)
                    } else {
                        connection.release()
                        console.log('Authentication failed');
                        res.sendStatus(409)
                    }
                })
            }
        })
    })
})

module.exports = router