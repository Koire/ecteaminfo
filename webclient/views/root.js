import {Login} from "./login";
import {Home} from "./home";

export const Root = state => {
    return state.loggedIn ? Home(state) : Login(state)
}
