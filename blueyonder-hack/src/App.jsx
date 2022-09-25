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
        <div className="contact">
            <ul>
              <li><h2>Contact Us</h2></li>
              <li><a href="https://blueyonder.com">BlueYonder</a></li>  
              <li><a href="mailto: pylinthon@gmail.com">pylinthon@gmail</a></li>
            </ul>
          </div>

          <div className="center-footer">
            <h2>
              Made by Pylinthon
            </h2>
          </div>

          <div className="social">
          </div>
      </footer>
    </div>
  );
}

export default App;
