import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { TwitterVerifyForm, TwitterVerifyFormVM } from '../organisms'

class TwitterVerification extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <div>
	<TwitterVerifyForm history={this.props.history} vm={this.twitterVerifyFormVM} />
      </div>
    )
  }

  get twitterVerifyFormVM() {
    return new TwitterVerifyFormVM()
  }

}

export default withRouter(TwitterVerification)
