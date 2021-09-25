import jwt from 'jsonwebtoken';
const secret = 'my-secret';

export async function createToken(userID) {
    const token = await jwt.sign({id: userID}, secret,{ expiresIn: '1y' });
    return token;
}

export async function readToken(token) {
    const user = await jwt.verify(token, secret);
    return user;
}