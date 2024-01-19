import React, {useState} from 'react'
import { json, useNavigate} from 'react-router-dom'

const SignUp = (props) => {
    
    const navigate = useNavigate()
    const [cred, setCred] = useState({name : "", age : "", email : "", password : "", profession : "student", gender : ""})
    const [failed, setFailed] = useState({email : false, age : false})

    const handleSignUp = async (e)=>{
        e.preventDefault()
        // console.log('inside handle sign up cred is ', cred)
        const {age} = cred;
        if(age<=12)
        {
            props.showAlert("Entered Valid Age", "warning")
            setFailed({ email : false, age : true})
        }
        else 
        {
            try {
                setFailed({email : false, age : false})
                let resp = await fetch('http://localhost:80/api/signup', {
                    method : 'post',
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(cred)
                })
    
                resp = await resp.json();
                if(resp.success)
                {
                    props.showAlert("Account Successfully Created", "success", 3000)
                    navigate('/')
                }
                else
                {
                    props.showAlert("Email Already Exists", "danger", 3000)
                    setFailed({  age : false, email : true})
                }
            }
            catch (error) 
            {
                
            }

        }
    }

    const handleChange = (e)=>{
        setCred({...cred, [e.target.name] : e.target.value})
    }
  return (
    <div className="container mt-5">
        <div className="row justify-content-center">

            <form action="" className='form-group w-75' onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="name" >Name</label>
                    <input type="text" className='form-control'id="name" name="name" value={cred.name} onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="age" >Age</label>
                    <input type="number" className='form-control'id="age" name="age" value={cred.age} onChange={handleChange}/>
                    {failed.age && <small className='form-invalid text-danger'>Age must be between 12 and 75 </small>}
                </div>

                <div className=''>
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' name="email" value={cred.email} onChange={handleChange}/>
                    {failed.email && <small className='form-invalid text-danger'>Please use different email </small>}
                </div>

                <div className=''>
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' name="password" value={cred.password} onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="">Work as</label>
                    <select name="profession" id="" className='form-control w-50' onChange={handleChange} defaultValue={"student"}>
                        <option value="student">Student</option>
                        <option value="engineer">Engineer</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className='d-sm-flex'>
                    <label htmlFor="gender">Gender</label>
                    <div className="form-check mx-2">
                        <input type="radio" name="gender" id="male" value="male" className='form-check-input' onChange={handleChange}/>
                        <label htmlFor="male" className='form-check-label'>Male</label>
                    </div>
                    <div className="form-check mx-2">
                        <input type="radio" name="gender" id="female" value="female" className='form-check-input' onChange={handleChange}/>
                        <label htmlFor="female" className='form-check-label'>Female</label>
                    </div>
                    <div className="form-check mx-2">
                        <input type="radio" name="gender" id="other" value="other" className='form-check-input' onChange={handleChange}/>
                        <label htmlFor="other" className='form-check-label'>Other</label>
                    </div>
                </div>


                <button className='btn btn-success d-block mx-auto mt-md-3 mt-sm-2'>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp