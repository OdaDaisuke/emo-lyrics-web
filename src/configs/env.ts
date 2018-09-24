export const env = {
  apiBaseUri: process.env.API_BASE_URI as string,
  lyricShuffleRound: process.env.LYRIC_SHUFFLE_ROUND as string,
  tweetBaseUri: process.env.TWEET_BASE_URI as string,
  siteUrl: process.env.SITE_URL as string,
  cloudFunctoinsEndpoint: process.env.CLOUD_FUNCTIONS_ENDPOINT as string,
  cloudFunctionsAuthToken: process.env.CLOUD_FUNCTIONS_AUTH_TOKEN as string,
  firebaseApiKey: process.env.FIREBASE_API_KEY as string,
  firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
  firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL as string,
  firebaseProjectID: process.env.FIREBASE_PROJECT_ID as string,
  firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
  firebaseMessegingSendorID: process.env.FIREBASE_MESSEGING_SENDOR_ID as string,
}