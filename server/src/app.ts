import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';

import { notFound, errorHandler } from './middlewares.js';
import api from './api/index.js';

dotenv.config()

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(json());

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;
