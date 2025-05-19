import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../modules/user/user.service';
import { UserRole } from '../enums';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (req?.user) {
      const userDetail = await this.userService.findByEmail(req.user.email);
      if (userDetail?.role !== UserRole.ADMIN) {
        throw new BadRequestException('Only Admin can access this resource');
      }
    }
    return true;
  }
}
