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

  async signinWithTwitter(callback: () => void) {
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then((result: any) => {
        const storage = this.storage.load()
        this.storage.save(Object.assign({}, storage, {
          account: result.additionalUserInfo.profile,
        }))
        callback()
 
      }).catch((error) => {
        console.error(error)
      })
  }

  get isAuthed(): boolean {
    const s = this.storage.load()
    if(!s) {
      return false
    }

    if(typeof s.account != "undefined") {
      return true
    }

    return false
  }

}
