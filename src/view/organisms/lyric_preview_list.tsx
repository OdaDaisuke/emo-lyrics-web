import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { LyricPreviewCard } from '../molecules'
import { MediaBreakPointUp } from '../styles'

interface ILyricPreviewListProps {
    onClickSignin: () => void
    isAuthed: boolean
    onClickToTL: () => void
}

export class LyricPreviewList extends React.Component<ILyricPreviewListProps, any> {
    render() {
        return (
            <ul className={css(this.styles.container)}>
                <LyricPreviewCard />
                <LyricPreviewCard />
                <LyricPreviewCard
                    onClickSignin={this.props.onClickSignin}
                    isRistrict={true}
                    isAuthed={this.props.isAuthed}
                    onClickToTL={this.props.onClickToTL}
                />
            </ul>
        )
    }

    get styles() {
        return StyleSheet.create({
            container: {
                marginTop: '2em',
                marginBottom: '50px',
                overflowX: 'scroll',
                padding: 0,
                [MediaBreakPointUp.SM]: {
                    display: 'flex',
                },
            },
        })
    }

}