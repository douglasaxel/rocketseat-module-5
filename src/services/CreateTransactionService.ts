import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const balance = await transactionRepository.getBalance();
    if (type === 'outcome' && balance.total < value)
      throw new AppError('Insufficient Funds.');

    const categoryRepository = getRepository(Category);

    const categoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    let cat: string;
    if (!categoryExists) {
      const savedCategory = categoryRepository.create({ title: category });
      await categoryRepository.save(savedCategory);
      cat = savedCategory.id;
    } else {
      cat = categoryExists.id;
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: cat,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
