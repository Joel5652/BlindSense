const express = require('express');
const router = express.Router()
const crypto = require('crypto');
const db = require('../DataBaseConnection');
const mysql = require('mysql')

router.use(express.json())

router.use('/', (req, res) => {
    const user = req.body.username;
    const hashingSecret = user;
    const password = crypto.createHmac('sha256', hashingSecret)
                        .update(req.body.password)
                        .digest('hex');
    
    db.getConnection( async (err, connection) => {
        if (err) throw (err)

        const sqlSearch = "SELECT * FROM Users WHERE UserID = ?"
        const search_query = mysql.format(sqlSearch,[user])

        const sqlInsert = "INSERT INTO Users (UserID, EncodedPassword) VALUES (?,?)"
        const insert_query = mysql.format(sqlInsert,[user, password])
        
        await connection.query(search_query, async(err, result)=>{
            if (err) throw (err)

            //if user exists
            if (result.length != 0) {
                connection.release()
                console.log(`User already exists`)
                res.sendStatus(409) 
            } else {
                await connection.query (insert_query, (err, result)=> {
                    connection.release()
                    if (err) throw (err)
                    console.log (`Created new user: ${user}`)
                    res.sendStatus(201)
                })
            }
        })
    })
})

module.exports = router