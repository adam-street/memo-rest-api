import dotenv from 'dotenv';
import devConfig from './dev.config.js';

dotenv.config();

let config;
switch (process.env.NODE_ENV) {
    case 'production':
        // TODO
        throw new Error("production env not configured");
        break;
    case 'test':
        // TODO
        throw new Error("production env not configured");
        break;
    default:
        config = devConfig;
        break;
}

config.secret = process.env.SECRET;
config.port = process.env.PORT;
config.env = process.env.NODE_ENV;

export default config;