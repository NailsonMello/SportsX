import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/home'
import Register from './pages/register'
import Update from './pages/update'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Register} path="/create-client" />
            <Route component={Update} path="/update-client" />
        </BrowserRouter>
    )
}

export default Routes