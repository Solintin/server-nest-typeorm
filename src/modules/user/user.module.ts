import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/utils/validation/jwt.strategy';
import { UserCreatedListener } from 'src/events/user-created.listeners';
import { MailModule } from '../mail/mail.module';
import { QueueModule } from '../queue/queue.module';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.JWTSecret'),
        signOptions: {
          expiresIn: configService.get('jwt.JWTExpirationTime'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => QueueModule),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, UserCreatedListener],
  exports: [UserService],
})
export class UserModule {}
