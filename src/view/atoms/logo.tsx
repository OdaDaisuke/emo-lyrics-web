import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Link } from 'react-router-dom'
import * as styles from '../styles'

export class Logo extends React.Component<any, any> {
    render(): JSX.Element {
        return (
	    <Link className={css(this.style.link)} to="/">
            <span className={css(this.style.logo)}>
                星酔喫茶
            </span>
	    </Link>
        )
    }

  get style() {
    return StyleSheet.create({
        logo: {
            color: '#3f3f3f',
            display: 'flex',
            flex: '0 0 150px',
            fontFamily: 'serif',
            fontSize: '0.88em',
            fontStyle: 'italic',
            fontWeight: 300,
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