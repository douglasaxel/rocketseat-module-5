import { Router, Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);

export default routes;
