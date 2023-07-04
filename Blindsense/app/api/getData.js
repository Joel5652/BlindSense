import client from './client';

const endPoint = '/getData';

const getDevices = (a) => {
    return client.post(endPoint, {"user": a.username})
}

export default {
    getDevices
};