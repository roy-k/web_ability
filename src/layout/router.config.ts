export const menuConfig = [
    {
        label: '可视化d3',
        route: 'd3',
        icon: 'icon-tupian1',
        // todo 多级路由
        children: [
            {
                label: '柱状图',
                route: 'bar',
                leaf: true,
            },
            {
                label: '饼状图',
                route: 'pie',
                leaf: true,
            },
            {
                label: '力导图',
                route: 'forceSimulation',
                leaf: true,
            },
        ],
    },
]