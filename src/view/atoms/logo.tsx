import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Link } from 'react-router-dom'

export interface LogoProps {
    isWhite?: boolean
}

export class Logo extends React.Component<LogoProps, any> {
    render(): JSX.Element {
        return (
	    <Link className={css(this.styles.link)} to="/">
            <span className={this.logoClass}>星酔喫茶</span>
	    </Link>
        )
    }

    get logoClass() {
        return [
            css(this.styles.logo),
            this.props.isWhite && css(this.styles.white),
        ].join(" ")
    }

    get styles() {
        return StyleSheet.create({
            logo: {
                color: '#3f3f3f',
                display: 'flex',
                flex: '0 0 150px',
                fontFamily: 'serif',
                fontSize: '0.92em',
                fontWeight: 300,
                letterSpacing: '1px',
                marginRight: 15,
                marginLeft: 15,
                paddingTop: 15,
                paddingBottom: 15,
                '-webkit-font-smoothing': 'antialiased',
            },
            white: {
                color: '#fff',
            },
            link: {
                textDecoration: 'none',
            },
        })
    }

}