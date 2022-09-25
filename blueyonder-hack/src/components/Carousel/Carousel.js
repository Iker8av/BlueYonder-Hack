import React from "react";
import reci1 from "../../components/Carousel/img/imgReciclaje1.jpeg"
import reci2 from "../../components/Carousel/img/imgReciclaje2.jpeg"
import reci3 from "../../components/Carousel/img/imgReciclaje3.jpeg"
const Carousel = () => {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src={reci1} className="d-block w-100" alt="Primera"/>
                </div>
                <div className="carousel-item">
                <img src={reci2} className="d-block w-100" alt="Vez"/>
                </div>
                <div className="carousel-item">
                <img src={reci3} className="d-block w-100" alt="Crack"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;