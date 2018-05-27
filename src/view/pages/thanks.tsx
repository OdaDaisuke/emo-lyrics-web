import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'
import { Button, Sentence } from '../atoms'

export default class Thanks extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <div className={css(this.style.wrapper)}>
	<Sentence center={true} label="最後まで見てくれてありがとうございました！" />
	<div className={css(this.style.widthMax)}>
	  <a href={`${configs.env.tweetBaseUri}?url=${configs.env.siteUrl}&text=「歌詞から曲を好きになる、EmoLyrics」&hashtags=エモ詩&via=hinodeya_pon`} target="_blank">
	    <Button type="tweet" label="Twitterでシェア" />
	  </a>
	</div>
      </div>
    )
  }

  get style() {
    return StyleSheet.create({
      wrapper: {
	alignContent: 'center',
	alignItems: 'center',
	display: 'flex',
	flexWrap: 'wrap',
	height: '90vh',
	marginRight: 'auto',
	marginLeft: 'auto',
	justifyContent: 'center',
	width: '85vw',
      },
      widthMax: {
	textAlign: 'center',
	width: '100%',
      },
    })
  }

}
