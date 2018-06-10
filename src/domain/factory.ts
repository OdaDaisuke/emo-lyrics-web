import { AccountService, LyricService } from './'
import { APIClient, AccountStorage } from '../infra'

export class DomainFactory {
  accountService: AccountService
  accountStorage: AccountStorage
  lyricService: LyricService

  constructor() {
    const apiClient = new APIClient()
    this.accountStorage = new AccountStorage()
    this.accountService = new AccountService(apiClient, this.accountStorage)
    this.lyricService = new LyricService(apiClient)
  }
}
