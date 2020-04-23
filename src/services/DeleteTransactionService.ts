import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(Transaction);
    const transaction = await transactionRepository.delete(id);

    if (transaction.affected === 0)
      throw new AppError('Transaction not found.', 404);
  }
}

export default DeleteTransactionService;
