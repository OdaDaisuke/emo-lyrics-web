import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { FaPlay } from 'react-icons/fa'

interface IPlayButtonProps {
    link: string
    className?: string
}

export const PlayButton = (props: IPlayButtonProps) => {
    const styles = StyleSheet.create({
        link: {
            color: '#fff',
            flex: '0 1 auto',
            fontSize: '1.68em',
            marginRight: 15,
            textAlign: 'center',
            textDecoration: 'none',
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