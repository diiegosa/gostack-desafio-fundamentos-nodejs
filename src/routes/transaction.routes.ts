import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import GetAllTransactionsWithBalanceService from '../services/GetAllTransactionsWithBalanceService';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

const getAllTransactionsWithBalance = new GetAllTransactionsWithBalanceService(
  transactionsRepository,
);

const CreateTransaction = new CreateTransactionService(transactionsRepository);

transactionRouter.get('/', (request, response) => {
  try {
    const allTransactionsWithBalance = getAllTransactionsWithBalance.execute();

    return response.json(allTransactionsWithBalance);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const transaction = CreateTransaction.execute({ title, value, type });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
