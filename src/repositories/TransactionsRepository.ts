import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public getBalanceWithTotal(): {} {
    return {
      ...this.balance,
      total: this.getTotalValueBalance(),
    };
  }

  public getTotalValueBalance(): number {
    return this.balance.income - this.balance.outcome;
  }

  private setBalance(value: number, type: string): void {
    const income = type === 'income' ? value : 0;

    const outcome = type === 'outcome' ? value : 0;

    this.balance = {
      income: this.balance.income + income,
      outcome: this.balance.outcome + outcome,
    };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    this.setBalance(value, type);

    return transaction;
  }
}

export default TransactionsRepository;
