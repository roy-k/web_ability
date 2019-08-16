import style from './layout.module.less'

import { Icon } from 'antd'

/**
 * todo
 * 1. 语言切换
 * 2. 主题切换
 */
export function Header() {
    return (
        <header className={style.header}>
            <Icon type='global' />
        </header>
    )
}
