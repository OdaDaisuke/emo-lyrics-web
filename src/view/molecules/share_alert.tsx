import * as React from 'react'

export interface ShareAlertProps {
}

export class ShareAlert extends React.Component<ShareAlertProps, any> {
  render(): JSX.Element {
    return (
      <div>
	よかったらシェアしてね◯
      </div>
    )
  }
}
