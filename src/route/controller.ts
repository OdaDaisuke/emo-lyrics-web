import * as history from 'history/'
import { restrictedLocations } from './route_group'
import { AccountService } from '../domain'

export class RouteController {
    history: history.History
    curLocation: history.Location
    accountService: AccountService | null = null

    constructor(history: any, accountService: AccountService) {
        this.history = history
        this.accountService = accountService
        this.curLocation = history.location

        this.bindLocationEvents()
        this.handleRedirect()
    }

    push(loc: string) {
        this.history.push(loc)
    }

    onLocationChanged(location: any) {
        this.curLocation = location
        this.handleRedirect()
    }

    handleRedirect() {
        if(this.isAtRestrictedLocation) {

            if(!this.isAuthed) {
                this.history.push('/')
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