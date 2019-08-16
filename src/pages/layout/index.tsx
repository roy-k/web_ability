import React, { lazy, useState } from "react"

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"

import style from "./layout.module.less"

import { Header } from "./header"
import { Aside } from "./aside"
import { Content } from "./content"
import { Footer } from "./footer"

export function Layout() {
    // ? todo layout 可否放在root上
    return (
        <Router>
            <Header />
            <Aside />
            <Content />
            <Footer />
        </Router>
    )
}
