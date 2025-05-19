import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  CreateUserSchema,
  GetUserDTO,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidation } from 'src/utils/validation/validation.decorator';
// import { ApiResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/utils/validation/jwt.guard';
import { PaginatedResponse } from 'src/utils/interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminRoleGuard } from 'src/utils/validation/admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @JoiValidation(CreateUserSchema)
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }

  @Get()
  @ApiBearerAuth('access_token')
  @PaginatedResponse(User)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  findAll(@Query() dto: GetUserDTO) {
    return this.userService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
