import { get, post, Options } from "./_request"

// 49.235.138.131/ecapi/user/login.do
export type LoginInfo = {
    userId: string // "abc"
    userName: string // "张无忌"
    loginName: string // "zwj"
    tel: string // "13512345678"
}
export async function fetch_login(
    params: {
        loginName: string
        pwd: string
        type: string
    },
    options?: Options
): Promise<LoginInfo> {
    return await post("/user/login.do", params)
}

export async function fetch_logout(
    options?: Options
): Promise<any> {
    return await get("/user/logout.do", {})
}
