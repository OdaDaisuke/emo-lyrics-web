export class AccountStorage {
  private storage = localStorage

  save() {
    this.storage.setItem("emoL.user", "true")
  }

  destroy() {
    this.storage.removeItem("emoL.user")
  }

  load(): string | null {
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
