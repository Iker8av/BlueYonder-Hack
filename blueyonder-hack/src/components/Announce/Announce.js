import React from "react";
import Imagen from "../Announce/img/BusinessEnterprise.png";

const Announce = () => {
    return (
        <div className="contenedorAnuncio">
            <div className="imagenAnuncio">
                <img src={Imagen}></img>
            </div>
            <div className="textAndButton">
                <p>
                Pylinthon allows users and recycling centers to connect with the expertise  
                of Blue Yonder’s cloud network, chain value collaborators, in order to deliver 
                only the best of services.
                </p>
                <button>Register your Business</button>
            </div>
        </div>
    );
}

export default Announce;