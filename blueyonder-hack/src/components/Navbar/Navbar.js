import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Navbar/img/logo.png"

const Navbar = ({type}) => {
    const navigate = useNavigate()
    return (
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <div className="contenedorMenu">
                    <div className="Logo">
                        <img src={Logo} className="logo"></img>
                    </div>
                    <div className="todoLoDemas">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Latest News</a>
                            </li>
                            
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Select your country
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Mexico</a></li>
                                <li><a class="dropdown-item" href="#">United States</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="#">Rest of the world</a></li>
                            </ul>
                            </li>
                            <li class="nav-item">
                            <a onClick={() => navigate("../SignUp", { replace: true })} class="nav-link" href="#">Sign in</a>
                            </li>
                            <li class="nav-item">
                            {type !== "Company" ? <a onClick={() => navigate("../LogIn", { replace: true })} class="nav-link" href="#">Log in</a> : <a onClick={() => navigate("../Business", { replace: true })} class="nav-link" href="#">Business</a>}
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