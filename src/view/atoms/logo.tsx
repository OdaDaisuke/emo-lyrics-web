import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Link } from 'react-router-dom'
import { utils } from '../styles'

export class Logo extends React.Component<any, any> {
    render(): JSX.Element {
        return (
	    <Link className={css(this.style.link)} to="/">
            <span className={css(this.style.logo)}>
                歌詞酔喫茶
            </span>
	    </Link>
        )
    }

  get style() {
    return StyleSheet.create({
        logo: {
            color: utils.baseColor,
            display: 'flex',
            flex: '0 0 150px',
            fontSize: '0.92em',
            fontWeight: 'bold',
            letterSpacing: '1px',
            marginRight: 15,
            marginLeft: 15,
            paddingTop: 15,
            paddingBottom: 15,
            '-webkit-font-smoothing': 'antialiased',
        },
        link: {
            textDecoration: 'none',
        },
    })
  }

}