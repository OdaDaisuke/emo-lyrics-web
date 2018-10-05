import * as firebase from 'firebase'
import { APIClient, Storage } from '../infra'

export class AccountService {
  private apiClient: APIClient
  private storage: Storage

  constructor(apiClient: APIClient, storage: Storage) {
    this.apiClient = apiClient
    this.storage = storage
  }

  saveAccount() {
  }

  loadAccount(): string | null {
    return ""
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

      this.storage.save({
        ...storage,
        account: account,
      })

      if(account.isNewUser) {
        this.apiClient.signup(account)
      } else {
        this.apiClient.signin(account.twitterId)
      }
 
      // }).catch((error) => {
      //   console.error(error)
      //   alert("ログイン中にエラーが発生しました。")
      // })

  }

  get isAuthed(): boolean {
    const s = this.storage.load()
    if(!s) {
      return false
    }

    if(typeof s.account != "undefined" && s.account != null) {
      return true
    }

    return false
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
