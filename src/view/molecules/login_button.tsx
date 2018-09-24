import * as React from 'react'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { Button } from '../atoms'

export interface LoginButtonProps {
  history: any
}

@observer
export class LoginButton extends React.Component<LoginButtonProps, any> {
  render(): JSX.Element {
    return (
      <Button onClick={this.handleClick}>Twitterログイン</Button>
    )
  }

  @bind
  handleClick() {
    this.props.history.push('/twitter_code_verification')
  }

}