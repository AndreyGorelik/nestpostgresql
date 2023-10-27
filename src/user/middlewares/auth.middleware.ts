import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestInterface } from '../user.types';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config/config';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.accesstoken) {
      req.user = null;
      next();
      return;
    }

    const token = Array.isArray(req.headers.accesstoken)
      ? req.headers.accesstoken[0]
      : req.headers.accesstoken;

    try {
      const decode = verify(token, JWT_SECRET);
      if (typeof decode !== 'string') {
        const user = await this.userService.findById(decode.id);
        req.user = user;
        next();
      }
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
