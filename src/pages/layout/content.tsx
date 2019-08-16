import { lazy } from 'react'
import { Switch, Route } from 'react-router-dom'

import style from './layout.module.less'

import { menuConfig } from './router.config'

import { asyncImport } from 'components/base/getAsyncImport'

export function Content() {
    return (
        <section className={style.content}>
            <Switch>
                {menuConfig.map(({ route, children }) => {
                    return (
                        <Route
                            key={route}
                            path={`/${route}`}
                            render={() => {
                                // todo 是否需要 match.path
                                // const { path } = match
                                return (
                                    <>
                                        {children
                                            ? children.map(child => {
                                                  const { route: childRoute } = child

                                                  return (
                                                      <Route
                                                          key={childRoute}
                                                          path={`/${route}/${childRoute}`}
                                                          component={asyncImport(lazy(() => import(`pages/${route}/${childRoute}`)))}
                                                      />
                                                  )
                                              })
                                            : null}
                                    </>
                                )
                            }}
                        />
                    )
                })}
            </Switch>
        </section>
    )
}
// () => {
//     const RouteC = asyncImport(
//         lazy(() => import(`pages/${route}/${childRoute}`))
//     )
//     return <RouteC />
// }
