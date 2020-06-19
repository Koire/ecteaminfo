import { Http } from "./http"

//Name the actions so default will show in Redux DevTools
const BaseURL = process.env.dev ? "https://fresh-catfish-2.telebit.io" : "http://localhost:3000"
const defaultHttpSuccess = (state, response) => ({...state, ...response})
const defaultHttpError = (state, response) => ({
    ...state,
    showProgressModal: false,
    error: {
        message: decodeURIComponent(escape(response.statusText)),
        code: response.status
    }
})
const defaultProps = {
    options: {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    },
    error: defaultHttpError,
    action: defaultHttpSuccess
}

export const requestApi = (endpoint, opts = {}) => {
    return Http({
        ...opts,
        url: `${BaseURL}/${endpoint.path}`,
        options: {...defaultProps.options, method: endpoint.method, ...opts.options,
            ...(endpoint.method === "POST") && {body: JSON.stringify(opts.options.body)}
        },
        action: opts.action || defaultProps.action,
        error: opts.error || defaultProps.error
    })
}


