import csvtojson from 'csvtojson';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

interface TransactionArray {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async execute(filepath: string): Promise<Transaction[] | void> {
    const transactions: Transaction[] = [];

    const csvTransactions = await csvtojson().fromFile(filepath);

    const createTransaction = new CreateTransactionService();

    // eslint-disable-next-line no-restricted-syntax
    for (const transaction of csvTransactions) {
      // eslint-disable-next-line no-await-in-loop
      const newTransaction = await createTransaction.execute(transaction);
      transactions.push(newTransaction);
    }

    return transactions;
  }
}

export default ImportTransactionsService;
