import { AccountService, LyricService, Tracker } from './'
import { APIClient, AccountStorage, CloudFunctionsClient } from '../infra'
import * as configs from '../configs'

export class DomainFactory {
  accountService: AccountService
  lyricService: LyricService
  tracker: Tracker

  constructor() {
    const apiClient = new APIClient()
    const accountStorage = new AccountStorage()
    const cloudFunctionsClient = new CloudFunctionsClient(configs.env.cloudFunctoinsEndpoint, configs.env.cloudFunctionsAuthToken)

    this.accountService = new AccountService(apiClient, accountStorage)
    this.lyricService = new LyricService(apiClient)
    this.tracker = new Tracker(cloudFunctionsClient)
  }

}
