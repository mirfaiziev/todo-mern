import React, {useState} from "react";
import {NavLink} from "react-router-dom";

export const LoginPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = event => {
        event.preventDefault()
        console.log(event)
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input id="email" name="email" onChange={changeHandler}/>
                <input id="password" name="password" onChange={changeHandler}/>
                <button className="btn ">Login</button>
                <NavLink to='/register'>Register</NavLink>
            </form>
        </div>

    )
}
