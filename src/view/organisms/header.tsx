import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { MediaBreakPointUp } from '../styles'
import { Logo } from '../atoms'
import { Menu } from '../molecules'
import { utils } from '../styles'

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
                boxShadow: '0 1px 30px -17px #3f3f3f',
                color: "#fff",
                position: 'relative',
                zIndex: 100,
                [MediaBreakPointUp.SM]: {
                    paddingTop: '5px',
                    paddingBottom: '5px',    
                },
            },
            container: Object.assign({}, utils.container, {
                display: 'flex',
            }),
        })
    }

}
