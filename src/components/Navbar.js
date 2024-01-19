import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {Context} from '../context/IdContext';


const Navbar = (props) => {
  const navigate = useNavigate();
  const context = useContext(Context)
  const {login, setLogin} = context
  const location = useLocation();

  console.log('initial login is ', login)

  const handleLogin = ()=>{
    navigate('/')
  }

  const handleSignUp = ()=>{
    navigate('/signup')
  }
  const handleLogout = ()=>{
    sessionStorage.removeItem('user');
    navigate('/')
    setLogin(false)
    props.showAlert("Logged Out Successfully", "warning")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark" >
        <div className="navbar-brand">
          <i className="fa-solid fa-book me-2"></i>
         NoteBook 
        </div>

        <button className='btn btn-primary navbar-toggler' data-bs-toggle="collapse" data-bs-target=".collapse">
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ">
            {<li className="nav-item nav-pills "><Link to="/" className={`nav-link ${location.pathname === '/' ? "active" : ""}`}>Home</Link></li>}
            {/* <li className="nav-item nav-pills"><Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? "active" : ""}`}>Contact</Link></li>
            <li className="nav-item nav-pills"><Link to="/about" className={`nav-link ${location.pathname === '/about' ? "active" : ""}`}>About Us</Link></li>
            <li className="nav-item nav-pills"><Link to="/products" className={`nav-link ${location.pathname === '/products' ? "active" : ""}`}>Products</Link></li> */}
          </ul>

          <div action="" className='d-flex ms-auto'>
            {!login && <button className="btn btn-success mx-2" onClick={handleLogin}>Login</button>}
            {!login && <button className="btn btn-outline-success" onClick={handleSignUp}>Sign Up</button>}
            {login && <button className="btn btn-warning" onClick={handleLogout}>Logout</button>}
          </div>

        </div>

      </nav>
    </>
  )
}

export default Navbar