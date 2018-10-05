import { Provider } from "mobx-react";

export interface Account {
    isNewUser: boolean
    providerId: string
    twitterId: string
    lang: string
    location: string
    name: string
    profileBannerUrl: string
    profileImageUrlHttps: string
    protected: boolean
    screenName: string
    url: string
}