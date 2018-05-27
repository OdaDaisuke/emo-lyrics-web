export class AccountStorage {
  private static storage = localStorage

  static save() {
    this.storage.setItem("emoL.user", "true")
  }

  static destroy() {
    this.storage.removeItem("emoL.user")
  }

  static load(): string | null {
    try {
      const user = this.storage.getItem("emoL.user")
      if(user) {
	return user
      }
      return null
    } catch {
      return null
    }
  }

}
