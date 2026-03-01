import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!roles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException({
        success: false,
        message: 'User not found in request.',
        errorCode: 'AUTH_403_NO_USER',
      });
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'You do not have permission to access this resource.',
      
        errorCode: 'AUTH_403_ROLE',
      });
    }

    return true;
  }
}