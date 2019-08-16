import React, {lazy} from "react";
import { asyncImport } from "components/base/getAsyncImport"

// const Formik = asyncImport(lazy(() => import('pages/form/formik')))

export const menuConfig = [
    {
        label: '表单类',
        route: 'form',
        icon: 'form',
        // todo 多级路由
        children: [
            {
                label: 'formik',
                route: 'formik',
                // component: Formik,
                leaf: true,
            },
            {
                label: 'antd form',
                route: 'antd-form',
                // component: Formik,
                leaf: true,
            }
        ],
    },
]