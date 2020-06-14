import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const RegisterPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const {loading, error, request} = useHttp()

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log('Data', data)
            // request('/api/auth/register')
            //     .then((response) => {
            //         const data = response.data
            //     })
        } catch (e) {
        }
    }


    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <input id="email" name="email" onChange={changeHandler}/>
                <input id="password" name="password" onChange={changeHandler}/>
                <button className="btn" disabled={loading}>Register</button>
                <NavLink to='/login'>Login</NavLink>
            </form>
        </div>
    )

}
