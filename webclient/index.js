import {h, app} from "hyperapp"
import {requestApi} from "./api/requests";
import {AtlasView} from "./views/atlasView";
import {Root} from "./views/root";

const initialState = {
    loggedIn: false,
    signUp: false
}

app({
    init: [
        {
            currentTable: "nothing"
        },
        requestApi({path:"teaminfo"}, {
            action: (state, res) => (
                {
                    ...state,
                    ...{atlasInfo: res},
                    currentTable: "atlas"
                })
        })
    ],
    view: Root,
    node: document.getElementById("root")
})
