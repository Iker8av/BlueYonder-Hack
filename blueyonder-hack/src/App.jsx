import {GoogleMap, useLoadScript, Marker, DirectionsRenderer} from "@react-google-maps/api"
import axios from 'axios'
import './App.css';
import Carousel from "./components/Carousel/Carousel";
import Navbar from "./components/Navbar/Navbar";
import nature from "../src/img/natureimg.png";

function App() {
  return (
    <div className="App">
      <section>
        <Navbar/>
      </section>
      <section className="description">
        <div className="text">
          <div className="titulo">
            <h1>Recycle And Live</h1>
          </div>
          <div className="parrafos">
            <p>
            “ReciclaTec” offers you a convenient way to connect with recycling centers that manage, 
            sort, and distribute otherwise wasteful products to the right place. 
            </p>
            <p>
            With comprehensive service capabilities,
            our service can allow customers to schedule their waste management where it can be taken and used.
            Stay up to date with news around the world, find useful tips about moving towards a greener path, and much more!
            Schedule a visit today!
            </p>
          </div>
        </div>
        <div className="imagenMain">
          <img src={nature}/>   
        </div>
      </section>
      <section className="noticias">
        <h2 className="news">Latest News</h2>
      </section>
        <Carousel/>
      <footer>
        <div className="wrapper">
         <div className="derechos">Todos los derechos reservados</div>
         <div className="hack">Hack Monterrey 2022</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
