import { User } from './entities/user.entity';

export interface UserResponse {
  user: UserType & { token: string };
}

export type UserType = Omit<User, 'hashPassword'>;
