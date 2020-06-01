import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const incomeSum = transactions.reduce((acc, curr) => {
      return curr.type === 'income' ? acc + Number(curr.value) : acc;
    }, 0);

    const outcomeSum = transactions.reduce((acc, curr) => {
      return curr.type === 'outcome' ? acc + Number(curr.value) : acc;
    }, 0);

    return {
      income: incomeSum,
      outcome: outcomeSum,
      total: Number(incomeSum) - Number(outcomeSum),
    };
  }
}

export default TransactionsRepository;
