import HTTP from 'src/core/API/HTTP';

interface IJWTToken {
  refresh: string;
  access: string;
}

export interface IUserForm {
  username: string;
  password: string;
  password2: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface IAuthService {
  token(username: string, password: string): Promise<IJWTToken>;
  tokenRefresh(refresh: string): Promise<IJWTToken>;
  register(params: IUserForm): Promise<any>;
}

export default class AuthService implements IAuthService {
  async token(username: string, password: string): Promise<IJWTToken> {
    return await HTTP.post('/auth/token/', { username, password });
  }

  async tokenRefresh(refresh: string): Promise<IJWTToken> {
    return await HTTP.post('/auth/token/refresh/', { refresh });
  }

  async register(params: IUserForm): Promise<any> {
    return await HTTP.post('/auth/register/', { ...params });
  }
}
