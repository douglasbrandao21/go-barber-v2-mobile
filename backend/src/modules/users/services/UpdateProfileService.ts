import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProviders/models/IHashProviders';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('Usuário não encontrado, tente novamente.');

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists && emailAlreadyExists.id !== user_id)
      throw new AppError('E-mail já cadastrado. Tente novamente.');

    user.name = name;
    user.email = email;

    if (password && !old_password)
      throw new AppError('A senha antiga deve ser informada. Tente novamente.');

    if (password && old_password) {
      const oldPasswordChecked = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!oldPasswordChecked)
        throw new AppError(
          'A senha informada está incorreta. Tente novamente.',
        );

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
