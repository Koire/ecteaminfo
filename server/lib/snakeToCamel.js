export const snakeToCamel = str => str.toLowerCase().replace(
    /(_\w)/g,
    (match) => match.toUpperCase().substr(1)
)

