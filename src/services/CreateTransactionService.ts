import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransaction): Transaction {
    const totalValueBalance = this.transactionsRepository.getTotalValueBalance();
    if (type === 'outcome') {
      if (totalValueBalance - value < 0)
        throw new Error('Você não tem saldo para realizar esta operação');
    }
    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
