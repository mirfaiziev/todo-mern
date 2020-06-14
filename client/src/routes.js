import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import {TodoListPage} from "./pages/TodoListPage";
import {LoginPage} from './pages/auth/LoginPage'
import {RegisterPage} from './pages/auth/RegisterPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/todos">
                    <TodoListPage/>
                </Route>
                <Route path="/create">
                    <TodoListPage/>
                </Route>
                <Route path="/detail/:id">
                    <TodoListPage/>
                </Route>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login">
                <LoginPage/>
            </Route>
            <Route path="/register">
                <RegisterPage/>
            </Route>
            <Redirect to="/login" />
        </Switch>
    )
}
