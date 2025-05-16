import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const newUser = this.userRepo.create({ ...createUserDto });
    await newUser.save();
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword as Omit<User, 'password'>;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: string) {
    return await this.userRepo.findOneByOrFail({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, { ...updateUserDto });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return await this.userRepo.remove(user);
  }
}
