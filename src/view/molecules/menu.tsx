import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

export class Menu extends React.Component<any, any> {
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