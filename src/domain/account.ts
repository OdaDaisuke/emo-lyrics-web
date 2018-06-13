import { APIClient, AccountStorage } from '../infra'

export class AccountService {
  private apiClient: APIClient
  private accountStorage: AccountStorage

  constructor(apiClient: APIClient, accountStorage: AccountStorage) {
    this.apiClient = apiClient
    this.accountStorage = accountStorage
  }

  getTwitterAuthUrl(callback: (url: string) => void) {
    if(!this.apiClient) {
      return
    }
    this.apiClient.getTwitterAuthUrl(callback)
  }

  sendVerificationCode(s: string, callback: (result: boolean) => void) {
    if(!this.apiClient) {
      return
    }
    this.apiClient.sendTwitterVerificationCode(s, callback)
  }

  saveAccount() {
    if(!this.accountStorage) {
      return
    }
    this.accountStorage.save()
  }

  loadAccount(): string | null {
    if(!this.accountStorage) {
      return null
    }
    return this.accountStorage.load()
  }
}
