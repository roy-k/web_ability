import React from 'react'
import style from './layout.module.less'

import Icon, {GlobalOutlined} from '@ant-design/icons'

/**
 * todo
 * 1. 语言切换
 * 2. 主题切换
 */
export function Header() {
    return (
        <header className={style.header}>
            <GlobalOutlined />
        </header>
    )
}
