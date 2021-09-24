import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import db from './lib/db.js';
import config from './config/index.js';
import memoRouter from './resources/memo/memo.router.js';

await db.connect();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan(config.log.format));

app.use('/api/memo', memoRouter);

app.listen(config.port, () => {
    console.log(`api started - port ${config.port} - ${config.env}`);
});