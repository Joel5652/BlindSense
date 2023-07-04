import client from './client';

const endPoint = '/alterData';

const alterData = (user,value,usernameChange, ID, password) => {
    return client.post(endPoint, 
        {
            "user": user,
            "password" : password,
            "value": value,
            "usernameChange": usernameChange,
            "ID": ID
        }
    )
}

export default {
    alterData
};