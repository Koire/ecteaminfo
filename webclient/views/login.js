import { h } from "hyperapp";
import {preventDefault} from "../actions/events";
import {requestApi} from "../api/requests";

const signUp = (state) => ({...state, ...{signUp: !state.signUp}})

const logData = (state) => [
   state,
    requestApi({path: "login", method: "POST"}, {
        options: {
            body: {
                username: state.username,
                password: state.password
            }
        }
    })
]

const updateInput = (state, {target: {value, name}}) => ({
    ...state,
    [name]: value
})


export const Login = state => {
    return h("div", {},
        h("form", {}, [
            h("input", {type: "text", name:"username", oninput: updateInput}),
            h("input", {type: "password", name:"password", oninput: updateInput}),
            state.signUp && h("input", {type: "password"}),
            h("button", {onclick: [logData, preventDefault]}, "Login")
        ]),
        h("div", {onclick: signUp}, "SignUp")
    )
}
