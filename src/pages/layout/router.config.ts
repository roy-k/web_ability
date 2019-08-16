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
                leaf: true,
            },
            {
                label: 'antd form',
                route: 'antd-form',
                leaf: true,
            }
        ],
    },
]