import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: any; access_token: string }> {
    const isExist = await this.findByEmail(createUserDto.email);
    if (isExist) {
      throw new BadRequestException('User already Exist');
    }
    const newUser = this.userRepo.create({ ...createUserDto });
    await newUser.save();
    const user = await this.login(newUser.email, createUserDto.password);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: string) {
    return await this.userRepo.findOneByOrFail({ id });
  }
  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, { ...updateUserDto });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return await this.userRepo.remove(user);
  }

  async login(email: string, password: string) {
    const user = (await this.findByEmail(email)) as any;
    if (!user) {
      throw new BadRequestException('No User with this email');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    delete user.password;
    return {
      access_token: this.jwtService.sign(payload),
      user: { ...user },
    };
  }
}
