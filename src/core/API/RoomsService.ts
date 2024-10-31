import HTTP from 'src/core/API/HTTP'

// TODO: Fix types
export interface IRoomsService {
  rooms(): Promise<any>
}

export default class RoomsService implements IRoomsService {
  async rooms(): Promise<any> {
    return await HTTP.get('api/rooms/')
  }
}
