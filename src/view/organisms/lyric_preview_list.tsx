import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { LyricPreviewCard } from '../molecules'
import { MediaBreakPointUp } from '../styles'

export class LyricPreviewList extends React.Component {
    render() {
        return (
            <ul className={css(this.styles.container)}>
                <LyricPreviewCard />
                <LyricPreviewCard />
                <LyricPreviewCard isRistrict={true} />
            </ul>
        )
    }

    get styles() {
        return StyleSheet.create({
            container: {
                marginTop: '2em',
                marginBottom: '1em',
                overflowX: 'scroll',
                padding: 0,
                [MediaBreakPointUp.SM]: {
                    display: 'flex',
                },
            },
        })
    }

}