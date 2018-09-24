import { restrictedLocations } from './route_group'

export class RouteController {
    history: any
    curLocation: any

    constructor(history: any) {
        this.history = history

        this.bindLocationEvents()
    }

    onLocationChanged(location: any) {
        this.curLocation = location
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