import fetch from "node-fetch"

export const fetchRetry = (url, options, retries=5, backoff=300) => {
    return fetch(url, options)
        .then(res => {
            if (res.ok) return res.json()
            if (retries > 0 ) {
                setTimeout(() => {
                    return fetchRetry(url, options, retries-1, backoff * 2)
                }, backoff)
            } else {
                throw new Error(res)
            }
        }).catch(console.error)
}
