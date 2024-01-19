import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Context} from '../context/IdContext';


const Login = (props) => {
    const [cred, setCred] = useState({ email: "", password: "", login: true, notes: false })
    const navigate = useNavigate();
    const context = useContext(Context)
    const {login, setLogin} = context;


    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch("http://localhost:80/api/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        })

        response = await response.json();
        if (response.login) {
            sessionStorage.setItem("user" , response.id)
            // setCred({login : true})
            props.showAlert("Login Successfull", "success")
            setLogin(true)
            navigate('/notes')
            
        }
        else 
        {
            props.showAlert("Invalid Credentials ", "danger")
            setCred({login : false})
        }

        setCred((prev)=>{return {email: "", password: "", notes: false, login : prev.login}})


    }
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        e.preventDefault()
        setCred((prev) => {
            if (name === "email")
                return {
                    email: value,
                    password: prev.password,
                    login: true,
                    notes: false
                }
            else {
                return {
                    email: prev.email,
                    password: value,
                    login: true,
                    notes: false
                }
            }
        })
    }
    return (
        <>
            <div className="container" >

                <div className="row min-vh-100 justify-content-center">
                    <form action='/api/login' method='GET' className="col-md-6 mt-md-5" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="text" className='form-control' name="email" value={cred.email} onChange={handleChange} />
                            {!cred.login && <small className="form-text text-danger">Please enter correct email</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" className='form-control' name="password" value={cred.password} onChange={handleChange} />
                            {!cred.login && <small className="form-text text-danger">Please enter correct password</small>}

                        </div>

                        <button className='btn btn-success d-block mt-3 m-auto'>Sign in
                        </button>
 

                    </form>
                </div>
            </div>
        </>
    )
}

export default Login