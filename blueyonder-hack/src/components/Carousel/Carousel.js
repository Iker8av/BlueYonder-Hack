import React from "react";
import reci1 from "../../components/Carousel/img/imgReciclaje1.jpeg"
import reci2 from "../../components/Carousel/img/imgReciclaje2.jpeg"
import reci3 from "../../components/Carousel/img/imgReciclaje3.jpeg"
const Carousel = () => {
    return (
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src={reci1} class="d-block w-100" alt="Primera"/>
                </div>
                <div class="carousel-item">
                <img src={reci2} class="d-block w-100" alt="Vez"/>
                </div>
                <div class="carousel-item">
                <img src={reci3} class="d-block w-100" alt="Crack"/>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;