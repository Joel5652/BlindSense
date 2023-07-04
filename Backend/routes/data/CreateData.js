const express = require('express');
const router = express.Router()
const crypto = require('crypto');
const db = require('../DataBaseConnection');
const mysql = require('mysql')

router.use(express.json())

router.use('/', (req, res)=>{
   
    const user = req.body.user
    const UniqueID = req.body.ID
    const DeviceName = req.body.DeviceName
    const DeviceID =  req.body.DeviceID

    //create device
    db.getConnection(async (err, connection)=>{
        if (err) throw (err)

        const DeviceSearch = "SELECT * FROM Devices WHERE DeviceID = ?"
        const DeviceSearchQuery = mysql.format(DeviceSearch, [DeviceID])

        const DeviceInsertion = "INSERT INTO Devices VALUES (?,?)"
        const DeviceInsertionQuery = mysql.format(DeviceInsertion, [DeviceID, DeviceName])

        const DevicePair = "INSERT INTO UserDevices VALUES (?,?,?)"
        const DevicePairEnquiry = mysql.format(DevicePair, [UniqueID, user, DeviceID])

        await connection.query(DeviceSearchQuery, async (err, result)=>{
            if (err) throw (err)

            if (result.length === 0){
                //doesnt exist - create new
                await connection.query(DeviceInsertionQuery, async (err)=>{
                    if (err) throw (err)
                    console.log('Device successfully created');
                     //asign device to current user
                    await connection.query(DevicePairEnquiry, (err)=>{
                        connection.release()
                        if (err) throw (err)
                        console.log('Device paired with user successfully');
                        res.sendStatus(201)
                    })
                })
            } else {
                //Already exists - failed 
                connection.release()
                console.log('Device already paired');
                res.sendStatus(409)
            }
        })
    })

})

module.exports = router 