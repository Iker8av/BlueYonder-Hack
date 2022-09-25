import {GoogleMap, useLoadScript, Marker, DirectionsRenderer} from "@react-google-maps/api"
import axios from 'axios'
import './App.css';
import Login from './components/LogIn/Login'

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
      {/* Lastest news */}
      <section>

      </section>
      {/* Contacto */}
      <footer>

      </footer>
      <Login></Login>
    </div>
  );
}

export default App;
