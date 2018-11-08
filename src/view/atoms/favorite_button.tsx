import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { FaStar } from 'react-icons/fa'

interface IFavoriteButtonProps {
    onClick: () => any
    className?: string
    favorited: boolean
}

export const FavoriteButton = (props: IFavoriteButtonProps) => {
    const styles = StyleSheet.create({
        container: {
            border: "1px solid #fff",
            borderRadius: 4,
            color: "#fff",
            cursor: 'pointer',
            display: 'inline-block',
            fontSize: '0.78em',
            marginRight: 15,
            marginBottom: 7,
            padding: '4px 18px',
            textAlign: 'center',
            textDecoration: 'none',
            transition: 'transform 0.2s',
            ':hover': {
                transform: 'scale(1.08)',
            },
            ':active': {
                transform: 'scale(1.08)',
            },
            ':focus': {
                transform: 'scale(1.08)',
            },
        },
        favoitedIcon: {
        },
    })

    let label = "お気に入りにする"
    if(props.favorited) {
        label = "お気に入りを解除"
    }

    const className = [
        css(styles.container),
        props.favorited && css(styles.favoitedIcon),
        props.className || "",
    ].join(" ")

    const onClick = () => {
        props.onClick()
    }

    return (
        <div
            onClick={onClick}
            className={className}
        >
            <FaStar /> {label}
        </div>
    )
}