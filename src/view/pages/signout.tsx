import * as React from 'react'
import { AccountService } from '../../domain'
import { RouteController } from '../../route/controller';

interface ISignoutPageProps {
    vm: SignoutPageVM
}

export class SignoutPage extends React.Component<ISignoutPageProps, any> {
    render() {
        return null
    }
}

export class SignoutPageVM {
    accountService: AccountService
    router: RouteController

    constructor(accountService: AccountService, router: RouteController) {
        this.accountService = accountService
        this.router = router

        this.accountService.signout()
        this.router.push("/")
    }
}