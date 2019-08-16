import React, { Suspense, lazy } from "react"

import { Spin } from "antd"

export type AsyncRouteProps = {
    path: string
}

export const AsyncRoute = (props: AsyncRouteProps) => {
    const { path } = props
    return (
        <Suspense
            fallback={
                <div className="por w100 h100">
                    <Spin className="poa-center" />
                </div>
            }>
            {/* {lazy(() => import(`${path}`))} */}
            {/* {lazy(() => import(`pages/form/formik`))} */}
            '123'
            {/* <WrappedComponent {...props} /> */}
        </Suspense>
    )
}
