export const BaseURL = "https://api-dot-pgdragonsong.appspot.com/api/v1"
const genUrl = path => new URL(`${BaseURL}/${path}`)
export const castleInfo = (castles) => genUrl("castle_info")
        .searchParams
        .append("cont_ids", castles.map(({contIdx, regionId}) => ({
            cont_idx: contIdx,
            k_id: 0,
            region_id: regionId
        }))
        .toString()
        )
export const teamContribution = () => genUrl("atlas/team/contribution").toString()
export const getMyProfile = apiKey => genUrl(`player/public/my_profile?apikey=${apiKey}`).toString()
