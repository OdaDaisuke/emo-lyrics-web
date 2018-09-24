import firebase from 'firebase'
import { env } from '../configs'

export class FirebaseClient {
    constructor() {
        const config = {
            apiKey: env.firebaseApiKey,
            authDomain: env.firebaseAuthDomain,
            databaseURL: env.firebaseDatabaseURL,
            projectId: env.firebaseProjectID,
            storageBucket: env.firebaseStorageBucket,
        }
        firebase.initializeApp(config)
    }
}