import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionWithBalance {
  transactions: Array<Transaction>;
  balance: {};
}

class GetAllTransactionsWithBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionWithBalance {
    return {
      transactions: this.transactionsRepository.all(),
      balance: this.transactionsRepository.getBalanceWithTotal(),
    };
  }
}

export default GetAllTransactionsWithBalanceService;
