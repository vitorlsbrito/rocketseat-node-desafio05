import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({ user_id }: IFindUserWithGamesDTO): Promise<User | undefined> {
    return await this.repository.findOne({ id: user_id }, { relations: ['games'] });  }


  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT * FROM users ORDER BY users.first_name ASC');
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query('SELECT * FROM users WHERE LOWER(users.first_name) = LOWER($1) AND LOWER(users.last_name) = LOWER($2)', [first_name, last_name]);
  }
}
