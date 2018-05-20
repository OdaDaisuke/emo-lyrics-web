import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import * as configs from '../../configs'

export interface HeaderProps {
}

export class Header extends React.Component<HeaderProps, any> {
    render(): JSX.Element {
        return (
            <header className={css(this.style.header)}>
                <div className={css(this.style.container)}>
                    <Logo />
                    <Menu />
                </div>
            </header>
        )
    }

    get style() {
        return StyleSheet.create({
            header: {
                backgroundColor: '#ffffff',
                borderBottom: "1px solid #efefef",
                color: "#fff",
            },
            container: Object.assign({}, configs.styles.container, {
                display: 'flex',
            }),
        })
    }

}

class Logo extends React.Component<any, any> {
    render(): JSX.Element {
        return (
	    <Link className={css(this.style.link)} to="/home">
	      <span className={css(this.style.logo)}>
                EmoLyrics
	      </span>
	    </Link>
        )
    }

  get style() {
    return StyleSheet.create({
        logo: {
            color: configs.styles.baseColor,
            display: 'flex',
            flex: '0 0 150px',
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

class Menu extends React.Component<any, any> {
    render(): JSX.Element {
        return (
            <nav className={css(this.style.menuWrap)}>
            </nav>
        )
    }

    get style() {
        return StyleSheet.create({
            menuWrap: {
                display: 'flex',
                flex: 'auto',
            },
            menuItem: {
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                textDecoration: "none",
            },
            menuLabel: {
                color: "#3f3f3f",
                letterSpacing: "1px",
                '-webkit-font-smoothing': 'antialiased',
                marginBottom: '-4px',
            },
        })
    }

}
