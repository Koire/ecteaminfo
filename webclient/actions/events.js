export const preventDefault = e => {
    e.preventDefault()
    return e
}

export const getValue = ({target: {value}}) => value

