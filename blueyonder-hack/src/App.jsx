import {GoogleMap, useLoadScript, Marker, DirectionsRenderer} from "@react-google-maps/api"
import axios from 'axios'
import './App.css';
import Carousel from "./components/Carousel/Carousel";

function App() {
  return (
    <div className="App">
      <section className="description" >
        <div className="text">
            <h1>Recycle And Live</h1>
            <p>Recycle And Live is a website that helps you find the nearest recycling center to you. We also provide you with information about recycling and how to recycle.</p>
        </div>
        <img src=""/>   
      </section>
        <Carousel/>
      <section>

      </section>
      {/* Contacto */}
      <footer>
      </footer>
    </div>
  );
}

export default App;
