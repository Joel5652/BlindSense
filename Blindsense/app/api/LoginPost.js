import client from './client';

const endPoint = '/login';

const LoginPost = (data) => {
    return client.post(endPoint, data)
}

export default {
    LoginPost
};