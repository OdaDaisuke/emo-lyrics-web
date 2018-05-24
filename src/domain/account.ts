import { APIClient } from '../infra'

export class AccountService {
  getTwitterAuthUrl(callback: any) {
    APIClient.getTwitterAuthUrl(callback)
  }

  sendVerificationCode(s: string, callback: any) {
    APIClient.sendTwitterVerificationCode(s, callback)
  }
}
