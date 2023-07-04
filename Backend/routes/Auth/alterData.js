const express = require('express');
const router = express.Router()
const db = require('../DataBaseConnection')
const mysql = require('mysql')
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

router.use(express.json())

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }

router.use('/', (req,res) => {

    const user = req.body.user
    const currentPassword = req.body.password
    const value = req.body.value
    const UniqueID = req.body.ID

    if(req.body.usernameChange === true){

        console.log('Username changing');

        const UserIDAlter = 'UPDATE Users SET UserID = ? WHERE ID = ?'
        const UserIDAlterQuery = mysql.format(UserIDAlter, [value, UniqueID])

        const newPassword = crypto.createHmac('sha256', value)
                            .update(currentPassword)
                            .digest('hex');

        const UserPasswordAlter1 = 'UPDATE Users SET EncodedPassword = ? WHERE UserID = ?'
        const UserPasswordAlterQuery1 = mysql.format(UserPasswordAlter1, [newPassword, value])

        const UserSearch = 'SELECT * FROM Users WHERE UserID = ?'
        const UserSearchQuery = mysql.format(UserSearch, [value])

        const UserDevicePair = 'UPDATE UserDevices SET UserID = ? WHERE ID = ?'
        const UserDevicePairQuery = mysql.format(UserDevicePair, [value, UniqueID])



        db.getConnection( async (err, connection) => {
            if (err) throw (err) 

            //check if this username already exists.

            await connection.query(UserSearchQuery, async (error, result) => {
                if(error) throw (error)
                if(result.length === 0){
                    await connection.query(UserIDAlterQuery, async(err)=>{
                        if (err) throw (err)
                        console.log('Username changed successfully');
                    })
                    await connection.query(UserDevicePairQuery, async(err)=>{
                        if (err) throw (err)
                        console.log('Devices re-paired to new UserID successfully');
                    })
                    await connection.query(UserPasswordAlterQuery1, async(err)=>{
                        if (err) throw (err)
                        const token = generateAccessToken({ username: value, ID: UniqueID, password: req.body.password });
                        console.log('Password re-hashed to new UserID successfully');
                        res.json(token)
                    })
                } else {
                    res.sendStatus(409)
                }
            })

            
        })
    } else {

        console.log('Password changing');

        let hashingSecret = user;
        let password = crypto.createHmac('sha256', hashingSecret)
                            .update(req.body.value)
                            .digest('hex');

        const UserPasswordAlter = 'UPDATE Users SET EncodedPassword = ? WHERE UserID = ?'
        const UserPasswordAlterQuery = mysql.format(UserPasswordAlter, [password, user])

        console.log(req.body.value);

        db.getConnection( async (err, connection) => {
            if (err) throw (err) 

            await connection.query(UserPasswordAlterQuery, async(err)=>{
                if (err) throw (err)
                console.log('Password changed');
                res.sendStatus(201)
            })
        })
    }

    
})

module.exports = router