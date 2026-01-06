import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    // const token = this.extractTokenFromHeader(request);
    // console.log('token', token);
    if (!token) {
      throw new UnauthorizedException();
    }

    if (this.authService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token has been revoked');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractToken(request: any): string | null {
    // Try to get token from cookie first
    const cookieToken = request.cookies?.access_token;
    // console.log('cookies:', request.cookies);
    if (cookieToken) {
      // return cookieToken;
    }

    // Fall back to Authorization header
    const authHeader = request.headers.authorization;
    // console.log('auth header:', authHeader);
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      return authHeader.split(' ')[1];
    }

    // Last resort - check raw cookie header
    const rawCookies = request.headers.cookie;
    if (rawCookies) {
      const match = rawCookies.match(/access_token=([^;]+)/);
      if (match) return match[1];
    }

    return null;
  }

  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (token) {
      request.headers = request.headers || {};
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  }
}
