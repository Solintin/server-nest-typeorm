import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/utils/enums';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(data?: Partial<User>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '9f0712a8-27a6-4a3e-ae7f-9d97dbef6c42',
  })
  id: string;

  @Column({ nullable: true })
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @Column()
  password: string;

  @Column()
  @ApiProperty({
    description: 'Phone number of the user',
    example: '+2348012345678',
  })
  phoneNumber: string;

  @Column({ nullable: true, default: UserRole.MEMBER })
  @ApiProperty({
    description: 'Role of the user',
  })
  role?: UserRole;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2025-05-18T12:00:00Z',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2025-05-18T13:00:00Z',
  })
  updateAt: Date;

  @BeforeInsert()
  async setPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
