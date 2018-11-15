import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Button, PlayButton } from '../atoms'
import { MediaBreakPointUp } from '../styles'

interface ILyricPreviewCardProps {
    lyric?: string
    artist?: string
    title?: string
    isRistrict?: boolean
    onClickSignin?: () => void
    isAuthed?: boolean
    onClickToTL?: () => void
}

export class LyricPreviewCard extends React.Component<ILyricPreviewCardProps, any> {
    render() {
        return (
            <div className={this.containerStyle}>
                <p className={css(this.styles.lyric)}>同僚に笑われても、デスクの上の写真立てに飾った家族が自慢なんだ</p>
                    <footer className={css(this.styles.footer)}>
                        <PlayButton link="https://www.youtube.com/watch?v=gp7BjltjDeE" />
                        <div className={css(this.styles.lyricDetail)}>
                            <span className={css(this.styles.title)}>遅くなるから</span>
                            <span className={css(this.styles.artist)}>セットラウンドリー</span>
                       </div>
                    </footer>
            </div>
        )
    }

    get containerStyle() {
        return [
            css(this.styles.container),
            this.props.isRistrict && css(this.styles.restrictedContainer),
        ].join(' ')
    }

    get styles() {
        return StyleSheet.create({
            container: {
                border: '1px solid #fff',
                borderRadius: 2,
                boxShadow: '4px 4px 0 #3f3f3f, 6px 6px 0 #fff',
                boxSizing: 'border-box',
                flex: '1 0 270px',
                margin: '0 auto 45px',
                padding: '0.7em 0.4em 0.7em 1em',
                textAlign: 'left',
                width: 270,
                [MediaBreakPointUp.SM]: {
                    flex: '1 0 48%',
                    padding: '1em 1em 1em 1.45em',
                    width: '48%',
                },
                [MediaBreakPointUp.MD]: {
                    flex: '1 0 40%',
                    width: '40%',
                },
                [MediaBreakPointUp.LG]: {
                    flex: '1 0 30%',
                    width: '30%',
                },
            },
            restrictedContainer: {
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flex: '1 0 275px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: '0.75em 0',
                textAlign: 'center',
                width: 275,
            },
            footer: {
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
            },
            lyric: {
                color: '#fff',
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: 1,
                lineHeight: '2.05',
                marginTop: 0,
                marginBottom: 8,
                [MediaBreakPointUp.SM]: {
                    fontSize: 16,
                },
            },
            restrictLabel: {
                color: '#6f6f7f',
                display: 'block',
                fontSize: '0.9em',
                fontWeight: 400,
                letterSpacing: '1px',
                marginBottom: 22,
                textAlign: 'center',
                width: '100%',
            },
            lyricDetail: {
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
            },
            title: {
                color: '#fff',
                flex: '1 0 100%',
                fontSize: '0.68em',
                fontWeight: 600,
                letterSpacing: '1px',
                marginBottom: 5,
            },
            artist: {
                color: '#fff',
                fontSize: '0.69em',
                fontWeight: 200,
                letterSpacing: '1px',
            },
        })
    }
}