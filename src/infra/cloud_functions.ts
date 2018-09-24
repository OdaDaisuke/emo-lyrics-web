import axios, { AxiosError, AxiosInstance } from "axios"
import * as rx from 'rxjs'
import * as uuid from 'uuid'

export class CloudFunctionsClient {
    private axios: AxiosInstance

    private authToken: string
    private errorSbj = new rx.Subject<any>()
    private os: string | null = null
    private userId: string | null = null
    private endpoint: string

    constructor(endpoint: string, authToken: string) {
        this.axios = axios.create()
        this.axios.interceptors.request.use(req => {
            if (this.authToken) {
                const header = {
                    Authorization: authToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
                req.headers = Object.assign({}, req.headers, header)
            }
            return req
        })

        this.axios.interceptors.response.use(res => {
            return res
        }, (error) => {
            this.onError(error)
        })

        this.endpoint = endpoint
        this.authToken = authToken
        this.setFixedParameters()
    }

    private async sendBqEvent(eventName: string, data: Object): Promise<any> {
        let params = new URLSearchParams()
        params.append('type', eventName)
        params.append('data', JSON.stringify(data))

        const res = await this.axios.post<any>(this.endpoint, params)
        return res.data
    }

    private onError(error: AxiosError | Error): void {
        const e = error as AxiosError
        if (!e.response) {
            throw e
        }

        switch (e.response.status) {
            case 401:
                this.errorSbj.next()
                console.log('Unauthorized.')
                break
        }
        throw e
    }

    /*------ tracking events ------*/

    async trackPageView(userId: string | null) {
        if(!this.userId) {
            this.userId = userId
        }

        const params = Object.assign({}, this.commonParameters, {
            userID: userId,
        })
        return await this.sendBqEvent('page_views', params)
    }

    async trackLyricView(lyricID: number) {
        const params = Object.assign({}, this.commonParameters, {
            userID: this.userId,
            lyricID: lyricID,
        })
        return await this.sendBqEvent('lyric_viwes', params)
    }

    async trackLeaveLyric(lyricID: number) {
        const params = Object.assign({}, this.commonParameters, {
            userID: this.userId,
            lyricID: lyricID,
        })
        return await this.sendBqEvent('lyric_clicks', params)
    }

    async trackSignup(account: any) {
        const params = Object.assign({}, this.commonParameters, {
        })
        return await this.sendBqEvent('users', params)
    }

    /*------ Private utilities ------*/

    private setFixedParameters() {
        this.setOS()
    }

    private get commonParameters() {
        return {
            browser: navigator.appName,
            city: null,
            id: uuid.v4(),
            createdAt: this.getFormatedTimestamp(),
            currentUrl: document.URL,
            initialReferrer: null,
            os: this.os,
            referrer: document.referrer,
        }
    }

    private getFormatedTimestamp() {
        const d = new Date()
        const y = d.getFullYear()
        const mon = this.numPadding(d.getMonth() + 1)
        const date = this.numPadding(d.getDate())
        const h = this.numPadding(d.getHours())
        const min = this.numPadding(d.getMinutes())
        const s = this.numPadding(d.getSeconds())
        return `${y}-${mon}-${date} ${h}:${min}:${s}`
    }

    private numPadding(n: any) {
        return (n < 10) ? `0${n}` : n
    }

    private get minimumParameters() {
        return {
            createdAt: this.getFormatedTimestamp(),
            id: uuid.v4(),
        }
    }

    private setOS() {
        let os = null
        const ua = navigator.userAgent
        if (ua.match(/Win(dows )?NT 10\.0/)) {
            os = "Windows_10"
        } else if(ua.match(/Win(dows )?NT 6\.3/)) {
            os = "Windows_8_1"
        } else if(ua.match(/Win(dows )?NT 6\.2/)) {
            os = "Windows_8"
        } else if(ua.match(/iPhone/)) {
            os = "iPhone"
        } else if(ua.match(/iPad/)) {
            os = "iPad"
        } else if(ua.match(/Mac|PPC/)) {
            os = "MacOS"
        } else if(ua.match(/Android ([\.\d]+)/)) {
            os = "Android"
        } else if(ua.match(/Linux/)) {
            os = "Linux"
        }
        this.os = os
    }
}