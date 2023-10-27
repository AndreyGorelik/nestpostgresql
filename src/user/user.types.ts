import { User } from './entities/user.entity';
import { Request } from 'express';
export interface UserResponseInterface {
  user: UserType & { token: string };
}

export type UserType = Omit<User, 'hashPassword'>;

export interface ExpressRequestInterface extends Request {
  user?: User;
}
