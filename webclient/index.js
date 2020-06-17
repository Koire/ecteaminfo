import {h, app} from "hyperapp"
import {requestApi} from "./api/requests";

const sortTable = (stateKey, fieldKey) => (state, payload) => {
    const sortDir = state[stateKey][0][fieldKey] > state[stateKey][1][fieldKey] ? -1 : 1
    return {
        ...state,
        ...{[stateKey]: state[stateKey].sort((a, b) => a[fieldKey] < b[fieldKey] ? sortDir : sortDir * -1).map(it => it)}
    }
}
app({
    init: [
        {},
        requestApi({path:"teaminfo"}, {
            action: (state, res) => ({...state, ...{atlasInfo: res}})
        })
    ],
    view: ({atlasInfo}) => h("div", {}, [
        h("h2", {}, "EC Info Page"),
        h("div", {}, "Various Choices"),
        h("div", {},
            atlasInfo && h("table", {},[
                h("thead", {},
                    h("tr", {}, Object.keys(atlasInfo[0]).map(head => h("th", {"onclick": sortTable("atlasInfo", head)}, head)))
                ),
                h("tbody", {}, atlasInfo.map(user => h("tr", {}, ["name", "gold", "mats"].map(key => h("td", {}, user[key])))))
            ])
        )
    ]),
    node: document.getElementById("root")
})
