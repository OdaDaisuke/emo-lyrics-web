import { CloudFunctionsClient } from '../infra'

export class Tracker {
    private cloudFunctionsClient: CloudFunctionsClient
    private userId: string | null = null

    constructor(cloudFunctionsClient: CloudFunctionsClient) {
        this.cloudFunctionsClient = cloudFunctionsClient
    }

    trackPageView() {
        this.cloudFunctionsClient.trackPageView(this.userId)
    }

    trackLeaveLyric(lyricID: number) {
        this.cloudFunctionsClient.trackLeaveLyric(lyricID)
    }

    trackLyricView(lyricID: number) {
        this.cloudFunctionsClient.trackLyricView(lyricID)
    }

    trackSignup(account: any) {
        this.cloudFunctionsClient.trackSignup(account)
    }

}