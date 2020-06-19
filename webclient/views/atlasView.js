import { h } from "hyperapp"
import {sortTable} from "../actions/sortTable";

export const AtlasView = atlasInfo => h("table", {},[
    h("thead", {},
        h("tr", {}, Object.keys(atlasInfo[0]).map(head =>
            h("th", {"onclick": sortTable("atlasInfo", head)}, head)))
    ),
    h("tbody", {},
        atlasInfo.map(user => h("tr", {},
            ["name", "gold", "mats"].map(key => h("td", {}, user[key])))))
])
