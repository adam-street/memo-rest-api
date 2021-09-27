import dotenv from 'dotenv';
import devConfig from './dev.js';

dotenv.config();

let config;
switch (process.env.NODE_ENV) {
    case "production":
        throw new Error("production env not configured");
        break;
    case "test":
        throw new Error("production env not configured");
        break;
    default:
        config = devConfig;
}

config.env = process.env.NODE_ENV;
config.secret = process.env.SECRET;
config.port = process.env.PORT;

export default config;