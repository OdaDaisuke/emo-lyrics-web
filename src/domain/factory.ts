import { AccountService, LyricService, Tracker } from './'
import { APIClient, Storage, CloudFunctionsClient, FirebaseClient } from '../infra'
import * as configs from '../configs'

export class DomainFactory {
  accountService: AccountService
  lyricService: LyricService
  tracker: Tracker

  constructor() {
    const apiClient = new APIClient()
    const stoarge = new Storage()
    const cloudFunctionsClient = new CloudFunctionsClient(configs.env.cloudFunctoinsEndpoint, configs.env.cloudFunctionsAuthToken)
    const firebaseClient = new FirebaseClient()

    this.accountService = new AccountService(apiClient, stoarge)
    this.lyricService = new LyricService(apiClient)
    this.tracker = new Tracker(cloudFunctionsClient)
  }

}
