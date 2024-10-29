import AuthService, { IAuthService } from './AuthService';
import UserService, { IUserService } from './UserService';

interface IApiClient {
  authService: IAuthService;
  userService: IUserService;
}

class ApiClient implements IApiClient {
  public authService: IAuthService;

  public userService: IUserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }
}
// TODO: Add supporting of threeshaking
const Api = new ApiClient();

export default Api;
