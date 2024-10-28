import HTTP from 'src/core/API/HTTP';

export interface IUser {
    id?: number;
    is_superuser?: boolean;
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    is_active?: boolean;
}

export interface IUserService {
    getUser(): Promise<IUser>;
}

export default class UserService implements IUserService {
  async getUser(): Promise<IUser> {
    return await HTTP.get('/auth/user/');
  }
}
