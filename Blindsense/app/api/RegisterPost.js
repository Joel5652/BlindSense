import client from './client';

const endPoint = '/register';

const RegisterPost = (data) => {
    JSON.stringify(data)
    return client.post(endPoint, data)
}

export default {
    RegisterPost
};