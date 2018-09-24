import { StorageProps } from '../interfaces/storage'

export class Storage {
    key = "app"
    storage = localStorage

    save(data: StorageProps) {
        this.storage.setItem("app", JSON.stringify(data))
    }

    destroy() {
        this.storage.removeItem("emo")
    }

    load(): StorageProps | null {
        try {
            const data = this.storage.getItem("app")
            if(data) {
                return JSON.parse(data)
            }
            return null
        } catch {
            return null
        }
    }

}