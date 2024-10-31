import AuthService, { IAuthService } from './AuthService'
import UserService, { IUserService } from './UserService'
import RoomsService, { IRoomsService } from './RoomsService'

interface IApiClient {
  authService: IAuthService
  userService: IUserService
  roomsService: IRoomsService
}

class ApiClient implements IApiClient {
  public authService: IAuthService

  public userService: IUserService

  public roomsService: IRoomsService

  constructor() {
    this.authService = new AuthService()
    this.userService = new UserService()
    this.roomsService = new RoomsService()
  }
}
// TODO: Add supporting of threeshaking
const Api = new ApiClient()

export default Api
