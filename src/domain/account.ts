import { APIClient, AccountStorage } from '../infra'

export class AccountService {
  getTwitterAuthUrl(callback: any) {
    APIClient.getTwitterAuthUrl(callback)
  }

  sendVerificationCode(s: string, callback: any) {
    APIClient.sendTwitterVerificationCode(s, callback)
  }

  saveAccount() {
    AccountStorage.save()
  }

  loadAccount(): string | null {
    return AccountStorage.load()
  }
}
