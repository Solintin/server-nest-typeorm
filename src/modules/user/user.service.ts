import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreateUserDto, GetUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { paginate } from 'nestjs-typeorm-paginate';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserEvent } from 'src/common/constant.event';
// import { DataPaging } from 'src/utils/interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}
  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: any; access_token: string }> {
    const isExist = await this.findByEmail(createUserDto.email);
    if (isExist) {
      throw new BadRequestException('User already Exist');
    }
    const newUser = this.userRepo.create({ ...createUserDto });
    this.eventEmitter.emit(UserEvent.SEND_WELCOME_MAIL, newUser);
    await newUser.save();
    const user = await this.login(newUser.email, createUserDto.password);
    return user;
  }

  async findAll(dto: GetUserDTO) {
    // const users = await this.userRepo.find();
    const { page, limit, sort, sortDirection, createdBefore, createdAfter, q } =
      dto;

    const query = this.userRepo.createQueryBuilder('user');
    const _q = q?.toLowerCase();
    // Date range filtering
    if (createdBefore && createdAfter) {
      query.andWhere('user.createdAt BETWEEN :after AND :before', {
        after: createdAfter,
        before: createdBefore,
      });
    } else if (createdBefore) {
      query.andWhere('user.createdAt < :before', {
        before: createdBefore,
      });
    } else if (createdAfter) {
      query.andWhere('user.createdAt > :after', {
        after: createdAfter,
      });
    }

    // // Institution filtering
    // if (institutionId) {
    //   query.andWhere('user.institutionId = :institutionId', {
    //     institutionId,
    //   });
    // }
    // search filtering
    if (_q) {
      query.andWhere(
        new Brackets((qb) =>
          qb
            .orWhere('LOWER(user.name) LIKE :searchTerm', {
              searchTerm: `%${_q}%`,
            })
            .orWhere('LOWER(user.email) LIKE :searchTerm', {
              searchTerm: `%${_q}%`,
            })
            .orWhere('LOWER(user.phoneNumber) LIKE :searchTerm', {
              searchTerm: `%${_q}%`,
            }),
        ),
      );
    }
    if (sort) {
      query.orderBy(
        `user.${sort}`,
        sortDirection?.toUpperCase() as 'ASC' | 'DESC',
      );
    }

    const d = await paginate(query, { page: page ?? 1, limit: limit ?? 5 });
    const dataWithoutPassword = d.items.map(({ password, ...rest }) => rest);
    return {
      data: {
        data: dataWithoutPassword,
        paging: {
          totalPage: d.meta.totalPages,
          currentPage: d.meta.currentPage,
          itemCount: d.meta.itemCount,
          totalItems: d.meta.totalItems,
        },
      },
      message: 'Successful',
    };
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
