import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { bind } from 'bind-decorator'
import { AccountService } from '../../domain'
import { Button } from '../atoms'

export interface LoginButtonProps {
  history: any
  twitterOAuthUrl: string
}

@observer
export class LoginButton extends React.Component<LoginButtonProps, any> {
  render(): JSX.Element {
    return (
      <a href={this.props.twitterOAuthUrl} target="_blank">
      	<Button onClick={this.handleClick}>Twitterログイン</Button>
      </a>
    )
  }

  @bind
  handleClick() {
    this.props.history.push('/twitter_code_verification')
  }

}