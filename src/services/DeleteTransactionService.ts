import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(transaction_id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transiction = await transactionsRepository.findOne(transaction_id);

    if (!transiction) {
      throw new AppError('transaction not found', 400);
    }

    await transactionsRepository.delete(transaction_id);
  }
}

export default DeleteTransactionService;
