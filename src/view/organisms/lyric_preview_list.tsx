import * as React from 'react'
import { LyricPreviewCard } from '../molecules'
import { css, StyleSheet } from 'aphrodite'

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
                display: 'flex',
                marginTop: '2em',
                marginBottom: '1em',
                overflowX: 'scroll',
                padding: 0,
            },
        })
    }

}