import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../models';
import { UserEntity } from 'src/database/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(name: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ name });
  }

  async createOne({ name, password }: User): Promise<User> {
    const newUser: UserEntity = this.userRepository.create({
      name,
      password,
    });

    return await this.userRepository.save(newUser);
  }
}