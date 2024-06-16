import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Authorization token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'somethingsecret',
      });

      // Check if user has admin role
      if (payload.role !== 'admin') {
        throw new UnauthorizedException('User is not authorized as admin');
      }

      // Assign the payload to the request object so it's accessible in route handlers
      request.user = payload;
    } catch (err) {
      throw new UnauthorizedException('User is not authorized as admin');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      return authHeader.split(' ')[1];
    }
    return undefined;
  }
}
