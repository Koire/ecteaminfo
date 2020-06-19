import {h} from "hyperapp";
import {AtlasView} from "./atlasView";

export const Home = ({atlasInfo, currentTable}) => h("div", {}, [
    h("h2", {}, "EC Info Page"),
    h("div", {}, [
        h("div", {}, "Atlas Info"),
        h("div", {}, "Team Info"),
        h("div", {}, "Castle Info")
    ]),
    h("div", {},
        currentTable==="atlas" && AtlasView(atlasInfo)
    )
])
