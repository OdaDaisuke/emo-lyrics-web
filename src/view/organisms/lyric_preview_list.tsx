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
                display: 'flex',
                flexWrap: 'nowrap',
                left: 45,
                marginTop: '2em',
                marginRight: 60,
                marginBottom: 50,
                overflowX: 'scroll',
                padding: 0,
                position: 'relative',
                [MediaBreakPointUp.SM]: {
                    display: 'flex',
                },
            },
        })
    }

}