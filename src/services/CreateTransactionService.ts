import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  categoryName: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    categoryName,
  }: Request): Promise<Transaction> {
    const transitionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    let category = await categoriesRepository.findOne({
      where: { title: categoryName },
    });

    if (!category) {
      category = categoriesRepository.create({
        title: categoryName,
      });

      await categoriesRepository.save(category);
    }

    const balance = await transitionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw new AppError(
        'Você não tem esse saldo, chegou a hora de parar de gastar!',
      );
    }

    const transaction = transitionsRepository.create({
      title,
      value,
      type,
      category,
    });

    await transitionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
