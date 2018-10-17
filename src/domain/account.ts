import * as firebase from 'firebase'
import { APIClient, Storage } from '../infra'
import { Account } from '../interfaces/account'

export class AccountService {
  private apiClient: APIClient
  private storage: Storage
  me: Account | null = null

  constructor(apiClient: APIClient, storage: Storage) {
    this.apiClient = apiClient
    this.storage = storage
  }

  saveAccount() {
  }

  loadAccount(): Account | null {
    const s = this.storage.load()
    if(!s) {
      return null
    }
    this.me = s.account
    return this.me
  }

  signout() {
    const storage = this.storage.load()
    this.storage.save(Object.assign({}, storage, {
      account: null,
    }))
  }

  async signinWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider()

    const result = await firebase.auth().signInWithPopup(provider)
      const storage = this.storage.load()
      const userInfo = result.additionalUserInfo as any

      const account = {
        isNewUser: userInfo.isNewUser,
        providerId: userInfo.providerId,
        twitterId: userInfo.profile.id_str,
        lang: userInfo.profile.lang,
        location: userInfo.profile.location,
        name: userInfo.profile.name,
        profileBannerUrl: userInfo.profile.profile_banner_url,
        profileImageUrlHttps: userInfo.profile.profile_image_url_https,
        protected: userInfo.profile.protected,
        screenName: userInfo.profile.screen_name,
        url: userInfo.profile.url,
      }
      this.me = account

      this.storage.save({
        ...storage,
        account: this.me,
      })

      if(account.isNewUser) {
        this.apiClient.signup(this.me)
      } else {
        this.apiClient.signin(this.me.twitterId)
      }
 
  }

  async fetchMyFavs() {
    if(!this.me) {
      return null
    }
    return await this.apiClient.fetchMyFavs(this.me.twitterId)
  }

  async postFav(lyricId: number) {
    if(!this.me) {
      return null
    }
    return await this.apiClient.postFav(lyricId, this.me.twitterId)
  }

  async unFav(lyricID: number) {
    if(!this.me) {
      return null
    }
    return await this.apiClient.unFav(lyricID, this.me.twitterId)
  }

  get isAuthed(): boolean {
    const s = this.storage.load()
    if(!s) {
      return false
    }
    return (typeof s.account != "undefined" && s.account != null)
  }

  get dummyAccountData() {
    return {
      is_first: true,
      id: "1929242",
      lang: "ja",
      location: "",
      name: "yamada",
      profile_banner_url: "",
      profile_image_url_https: "",
      protected: false,
      screen_name: "yamada_2019",
      url: "",
    }
  }

}
