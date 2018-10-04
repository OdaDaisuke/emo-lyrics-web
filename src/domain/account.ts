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

  signinWithTwitter(callback: (result: any) => void) {
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then((result: any) => {
        const storage = this.storage.load()
        // const account = result.additionalUserInfo
        const account = this.dummyAccountData
        this.storage.save({
          ...storage,
          account: account,
        })
        callback(result)
 
      }).catch((error) => {
        console.error(error)
        alert("ログイン中にエラーが発生しました。")
      })

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
