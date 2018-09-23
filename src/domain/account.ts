import { APIClient, AccountStorage } from '../infra'

export class AccountService {
  private apiClient: APIClient
  private accountStorage: AccountStorage

  constructor(apiClient: APIClient, accountStorage: AccountStorage) {
    this.apiClient = apiClient
    this.accountStorage = accountStorage
  }

  getTwitterAuthUrl() {
    if(!this.apiClient) {
      return
    }
    return this.apiClient.fetchTwitterAuthUrl()
  }

  sendVerificationCode(s: string) {
    if(!this.apiClient) {
      return
    }
    return this.apiClient.sendTwitterVerificationCode(s)
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
