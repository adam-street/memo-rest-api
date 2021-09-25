import express from 'express';
import morgan from 'morgan';

import memoRouter from './resources/memo/memo.router.js';
import userRouter from './resources/user/user.router.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/memo', memoRouter);
app.use('/api/user', userRouter);

app.listen(3000, () => {
    console.log('server running on port 3000');
});