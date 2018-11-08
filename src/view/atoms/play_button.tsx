import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { FaPlay } from 'react-icons/fa'
import { MediaBreakPointUp } from '../styles';

interface IPlayButtonProps {
    link: string
    className?: string
    black?: boolean
}

export const PlayButton = (props: IPlayButtonProps) => {
    const styles = StyleSheet.create({
        link: {
            alignItems: 'center',
            borderRadius: '50%',
            border: (props.black) ? '1px solid #20203f' : '1px solid #fff',
            color: (props.black) ? '#20203f' : '#fff',
            display: 'flex',
            flex: '0 1 auto',
            fontSize: '1em',
            height: 45,
            justifyContent: 'center',
            marginRight: 15,
            paddingLeft: 2,
            textAlign: 'center',
            textDecoration: 'none',
            transition: 'transform 0.2s',
            width: 43,
            ':hover': {
                transform: 'scale(1.08)',
            },
            [MediaBreakPointUp.SM]: {
                height: 55,
                width: 53,
            },
        },
    })

    const className = [
        css(styles.link),
        props.className || "",
    ].join(" ")

    return (
        <a
            className={className}
            href={props.link}
            target="_blank"
        >
            <FaPlay />
        </a>
    )
}