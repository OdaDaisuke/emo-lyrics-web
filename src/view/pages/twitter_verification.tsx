import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { AccountService } from '../../domain'
import { TwitterVerifyForm, TwitterVerifyFormVM } from '../organisms'

export interface ITwitterVerificationProps {
  history: any
  accountService: AccountService
}

class TwitterVerification extends React.Component<any, any> {
  private accountService: AccountService

  constructor(props: any) {
    super(props)
    this.accountService = props.accountService
  }

  render(): JSX.Element {
    return (
      <div>
	<TwitterVerifyForm
	  history={this.props.history}
	  vm={this.twitterVerifyFormVM}
	/>
      </div>
    )
  }

  get twitterVerifyFormVM() {
    return new TwitterVerifyFormVM(this.accountService)
  }

}

export default withRouter(TwitterVerification)
