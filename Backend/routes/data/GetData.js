const express = require('express');
const router = express.Router()
const db = require('../DataBaseConnection')
const mysql = require('mysql')

router.use(express.json())

router.use('/', (req,res) => {

    const user = req.body.user

    db.getConnection( async (err, connection) => {
        if (err) throw (err) 
        const UserDevicesSearch = 'SELECT * from Devices where DeviceID in (select DeviceID from UserDevices where UserID = ?)'
        const UserDevicesSearchQuery = mysql.format(UserDevicesSearch, [user])

        await connection.query(UserDevicesSearchQuery, async(err,result)=>{
            if (err) throw (err)
            //check if user has any devices paired
            if(result.length === 0){
                connection.release()
                console.log('No devices paired with', user);
                res.sendStatus(409);
            } else {
                console.log('Found user devices', result);
                connection.release();
                res.send(result)
            }
        })
    })
})

module.exports = router