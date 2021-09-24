import dotenv from 'dotenv';
import devConfig from './dev.js';

dotenv.config();
const env = process.env.NODE_ENV

let config;
switch (env) {
    case "production":
        console.error('production environment not configured');
        break;
    case "test":
        console.error('test environment not configured');
        break;
    default:
        config = devConfig;
}

config.env = env;
config.port = process.env.PORT;
config.jwt.secret = process.env.JWT_SECRET;
config.db.auth = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
};

export default config;