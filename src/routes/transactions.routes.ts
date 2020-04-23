import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import upload from '../config/upload';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (req, res) => {
  const transactionsRepo = getCustomRepository(TransactionsRepository);
  const transactions = await transactionsRepo.find({
    relations: ['category'],
  });
  const balance = await transactionsRepo.getBalance();

  return res.json({
    transactions,
    balance,
  });
});

transactionsRouter.post('/', async (req, res) => {
  const { title, value, type, category } = req.body;

  const transactionService = new CreateTransactionService();
  const transaction = await transactionService.execute({
    title,
    value,
    type,
    category,
  });

  return res.json(transaction);
});

transactionsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const transactionService = new DeleteTransactionService();
  await transactionService.execute(id);

  return res.send();
});

transactionsRouter.post('/import', upload.single('file'), async (req, res) => {
  const importTransactions = new ImportTransactionsService();

  const transactions = await importTransactions.execute(req.file.path);

  return res.json(transactions);
});

export default transactionsRouter;
