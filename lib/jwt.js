import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export async function createToken(userID) {
    const token = await jwt.sign({id: userID}, config.secret,{ expiresIn: '1y' });
    return token;
}

export async function readToken(token) {
    const user = await jwt.verify(token, config.secret);
    return user;
}

export async function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = await readToken(token);
        req.body.user_id = user.id;
        next();
    } catch (error) {
        res.status(401).send({
            message: "invalid token"
        });
    }
}