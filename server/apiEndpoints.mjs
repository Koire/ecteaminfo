export const BaseURL = "https://api-dot-pgdragonsong.appspot.com/api/v1"
const genUrl = path => new URL(`${BaseURL}/${path}`)
export const castleInfo = (castles) => {
    const url = genUrl("castle_info")
    const contIds = castles.map(([contIdx, regionId]) => ({
        cont_idx: contIdx,
        k_id: 1,
        region_id: regionId
    }))
    url.searchParams
        .append("cont_ids", JSON.stringify(contIds))
    return url.toString()
}
export const teamContribution = () => genUrl("atlas/team/contribution").toString()
export const getMyProfile = apiKey => genUrl(`player/public/my_profile?apikey=${apiKey}`).toString()
export const getAllTeams = () => genUrl("atlas/teams/metadata/macro?k_id=1&realm_name=Celestial_Haven").toString()
export const getAllCastles = () => genUrl("atlas/castles/metadata/macro?k_id=1&realm_name=Celestial_Haven").toString()
