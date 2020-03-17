import React from 'react'

import { withRouter, Link } from "react-router-dom"

import style from "./layout.module.less"

import { menuConfig } from "./router.config"

import { Menu } from "antd"
// import Icon from '@ant-design/icons'
import { Icon } from "components/icon"

const { SubMenu } = Menu
const openKeys = menuConfig.map(({ route }) => route)

export const Aside = withRouter(({ match }) => {
    const { path } = match
    return (
        <aside className={style.aside}>
            <div className={style.pageTitle}>
                <Icon className={style.logo} type={"icon-xing"} />
                <h2 className={`dib ${style.title}`}>Web 常见功能开发</h2>
            </div>
            <Menu
                mode="inline"
                openKeys={openKeys}
                // onOpenChange={this.onOpenChange}
                style={{ width: "100%" }}>
                {menuConfig.map(({ label, route, icon, children }) => {
                    return (
                        <SubMenu
                            key={route}
                            title={
                                <span>
                                    <Icon type={icon} />
                                    <span>{label}</span>
                                </span>
                            }>
                            {children
                                ? children.map(child => {
                                    // todo leaf
                                      const { label, route: childRoute } = child
                                      return (
                                          <Menu.Item key={childRoute}>
                                              <Link to={`${path}${route}/${childRoute}`}>{label}</Link>
                                          </Menu.Item>
                                      )
                                  })
                                : null}
                        </SubMenu>
                    )
                })}
            </Menu>
        </aside>
    )
})
