import jwt from 'jsonwebtoken';
const secret = 'my-secret';

export async function createToken(userID) {
    const token = await jwt.sign({id: userID}, secret,{ expiresIn: '1y' });
    return token;
}

export async function auth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'missing token'
        });
    }

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const user = await jwt.verify(token, secret);
        req.body.userID = user.id;
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'invalid token'
        });
    }
}