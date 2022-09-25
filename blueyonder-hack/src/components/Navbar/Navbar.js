import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Navbar/img/logo.png"

const Navbar = ({myRef, isLoggedIn, handleLogout}) => {
    const navigate = useNavigate()
    const executeScroll = () => myRef.current.scrollIntoView()    
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className="contenedorMenu">
                    <div className="Logo">
                        <img style={{"cursor":"pointer"}} onClick={() => navigate("../", { replace: true })} src={Logo} className="logo"></img>
                    </div>
                    <div className="todoLoDemas">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <a onClick={() => executeScroll()} className="nav-link" aria-current="page" href="#">Latest News</a>
                            </li>
                            
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Select your country
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Mexico</a></li>
                                <li><a className="dropdown-item" href="#">United States</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="#">Rest of the world</a></li>
                            </ul>
                            </li>
                            <li className="nav-item">
                            <a onClick={() => navigate("../Map", { replace: true })} className="nav-link" href="#">Map</a>
                            </li>
                            <li class="nav-item">
                            {localStorage.getItem("type") !== "Company"  ? <a onClick={() => navigate("../SignUp", { replace: true })} className="nav-link" href="#">Sign in</a> : <a onClick={() => navigate("../Business", { replace: true })} class="nav-link" href="#">Business</a>}
                            </li>
                            <li className="nav-item">
                            {!isLoggedIn ? <a onClick={() => navigate("../LogIn", { replace: true })} class="nav-link" href="#">Log in</a> : <a onClick={() => {handleLogout()}} className="nav-link" href="#">Log Out</a>}
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export  default Navbar;