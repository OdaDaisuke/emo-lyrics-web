export class AccountStorage {
  private storage = localStorage

  save(userId: string) {
    this.storage.setItem("userAuthToken", JSON.stringify(userId))
  }

  destroy() {
    this.storage.removeItem("userAuthToken")
  }

  load(): string | null {
    try {
      const userId = this.storage.getItem("userAuthToken")
      if(userId) {
	return JSON.parse(userId)
      }
      return null
    } catch {
      return null
    }
  }

}
