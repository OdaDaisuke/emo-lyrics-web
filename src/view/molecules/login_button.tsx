import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { bind } from 'bind-decorator'
import { AccountService } from '../../domain'
import { Button } from '../atoms'

export interface LoginButtonProps {
  history: any
  vm: LoginButtonVM
}

@observer
export class LoginButton extends React.Component<LoginButtonProps, any> {
  constructor(props: LoginButtonProps) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <a href={this.props.vm.authUrl} target="_blank">
      	<Button onClick={this.handleClick}>Twitterログイン</Button>
      </a>
    )
  }

  @bind
  handleClick() {
    this.props.history.push('/twitter_code_verification')
  }

}

export class LoginButtonVM {
  private accountService: AccountService | null = null
  
  @observable authUrl: string = ""

  constructor(accountService: AccountService) {
    this.accountService = accountService
    this.accountService.getTwitterAuthUrl(this.setAuthUrl)
  }

  get userData(): string | null {
    if(!this.accountService) {
      return null
    }
    return this.accountService.loadAccount()
  }

  @bind
  private setAuthUrl(url: string) {
    this.authUrl = url
  }

}
