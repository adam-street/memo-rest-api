import express from 'express';
import morgan from 'morgan';

import {auth} from './lib/auth.js';
import config from './config/index.js';
import memoRouter from './resources/memo/memo.router.js';
import userRouter from './resources/user/user.router.js';

const app = express();
app.use(express.json());
app.use(morgan(config.morgan_format));

app.use('/api/user', userRouter);

app.use(auth);
app.use('/api/memo', memoRouter);

app.listen(config.port, () => {
    console.log(`server running | port ${config.port} | ${config.env}`);
});