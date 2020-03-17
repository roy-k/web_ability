import { get, post, Options } from "./_request"

export async function fetch_acg17_articleGroupByCategory(
    params: {
    },
    options?: Options
): Promise<any> {
    return await get("/acg17/countByCategory", params)
}

// export async function fetch_logout(
//     options?: Options
// ): Promise<any> {
//     return await get("/user/logout.do", {})
// }
