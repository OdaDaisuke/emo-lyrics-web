import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'
import { Button } from '../atoms'

export interface IThanksAlert {
  onClick: any
  isLast: boolean
}

export class ThanksAlert extends React.Component<IThanksAlert, any> {
  render(): JSX.Element {
    return (
      <div className={css(this.style.wrapper)}>
	<div className={css(this.style.inner)}>
	  よかったらシェアしてね
	  <a href={`${configs.env.tweetBaseUri}?url=https://aa.com&text=aa&hashtags=エモ詩&via=hinodeya_pon`} target="_blank">
	    <Button type="tweet" onClick={this.props.onClick}>リンクをシェア</Button>
	  </a>
	</div>
      </div>
    )
  }

  get style() {
    const isLast = this.props.isLast
    return StyleSheet.create({
			wrapper: {
				alignContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(0,0,0,0.8)',
				display: 'none',
				flexWrap: 'wrap',
				height: '100vh',
				justifyContent: 'center',
				left: 0,
				position: 'absolute',
				top: 0,
				width: '100vw',
			},
			inner: {
				color: '#fff'
			},
    })
  }

}
