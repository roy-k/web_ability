import React, { lazy } from "react"
import { Switch, Route } from "react-router-dom"

import style from "./layout.module.less"

import { menuConfig } from "./router.config"

import { asyncImport } from "components/base/getAsyncImport"

// const Formik = asyncImport(lazy(() => import('pages/form/formik')))
// const Formik = lazy(() => import('pages/form/formik'))


export function Content() {
    return (
        <section className={style.content}>
            <Switch>
                {/* <Route path="/form/formik" component={Formik}/> */}
                {/* {menuConfig.map(({ route, children }) => {
                    return (
                        <Route
                            key={route}
                            path={`/${route}`}
                            render={({ match }) => {
                                const { path } = match
                                return (
                                    <>
                                        {children
                                            ? children.map(child => {
                                                  const { route: childRoute, component } = child

                                                  return (
                                                      <Route
                                                          key={childRoute}
                                                          path={`/${route}/${childRoute}`}
                                                          component={Formik}
                                                      />
                                                  )
                                              })
                                            : null}
                                    </>
                                )
                            }}
                        />
                    )
                })} */}
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
