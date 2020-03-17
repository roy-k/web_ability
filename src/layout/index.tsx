import React, { lazy, useState } from "react"

import { BrowserRouter as Router } from "react-router-dom"

// import style from "./layout.module.less"

import { Header } from "./header"
import { Aside } from "./aside"
import { Content } from "./content"
import { Footer } from "./footer"

export function Layout() {
    return (
        <Router>
            <Header />
            <Aside />
            <Content />
            <Footer />
        </Router>
    )
}
