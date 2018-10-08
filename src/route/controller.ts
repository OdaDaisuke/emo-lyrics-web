import * as history from 'history/'
import { restrictedLocations } from './route_group'
import { AccountService, Tracker } from '../domain'

export class RouteController {
    history: history.History
    curLocation: history.Location
    accountService: AccountService | null = null
    tracker: Tracker | null = null

    constructor(history: any, accountService: AccountService, tracker: Tracker) {
        this.history = history
        this.accountService = accountService
        this.curLocation = history.location
        this.tracker = tracker

        this.initialize()
    }

    initialize() {
        this.bindLocationEvents()
        this.handleRedirect()
        this.accountService!.loadAccount()
        this.accountService!.fetchMyFavs()
    }

    push(location: string) {
        this.history.push(location)
        this.tracker!.trackPageView()
    }

    backPage() {
        this.history.goBack()
    }

    onLocationChanged(location: any) {
        this.curLocation = location
        this.handleRedirect()
    }

    handleRedirect() {
        if(this.isAtRestrictedLocation) {

            if(!this.isAuthed) {
                // this.history.push('/')
            }

        }
    }

    get isAuthed() {
        if(!this.accountService) {
            return false
        }
        return this.accountService.isAuthed
    }

    get isAtRestrictedLocation() {
        let matchFlag = false
        restrictedLocations.map(loc => {      
            if(this.curLocation.pathname.indexOf(loc) != -1) {
                matchFlag = true
            }
        })

        return matchFlag
    }

    private bindLocationEvents() {
        this.history.listen((location: any) => {
            this.onLocationChanged(location)
        })
    }

}