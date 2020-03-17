import Axios, { AxiosRequestConfig } from 'axios'

import { message } from 'antd'
import { data } from 'assets/js/util'

const HEAD_URL = '/api'

const instance = Axios.create({
    baseURL: window.location.origin,
    timeout: 30000,
    // headers
})

interface Params {
    [props: string]: any
}

export interface Options {
    setLoading?: (status: boolean) => void
}

interface Response {
    code: string
    msg: string
    data: any
}

async function _query(config: AxiosRequestConfig, options?: Options) {
    const setLoading = options && options.setLoading

    try {
        setLoading && setLoading(true)

        const { url, ...rest } = config

        const { status, data: result, statusText } = await instance(config)

        if (status !== 200) {
            throw new Error(statusText)
        }

        const { code, data: res, msg } = result as Response

        console.log('fetch res:', res)

        return res
    } catch (error) {
        if (error) {
            message.error('请求接口出错')
            console.error('fetch error:', error)
        }
        return Promise.reject()
    } finally {
        setLoading && setLoading(false)
    }
}

export function get(url: string, params: Params, options?: Options) {
    return _query(
        {
            url: `${HEAD_URL}${url}`,
            method: 'get',
            params,
            // paramsSerializer: (params) =>{}
        },
        options
    )
}

export function post(url: string, data: Params, options?: Options) {
    return _query(
        {
            url: `${HEAD_URL}${url}`,
            method: 'post',
            data,
            // paramsSerializer: (params) =>{}
        },
        options
    )
}
