import React from 'react'
import axios from 'axios';
import * as config from "../../config"
import './Map.css'
import {GoogleMap, useLoadScript, OverlayView, Marker, DirectionsRenderer} from "@react-google-maps/api"
import Geocode from "react-geocode";

export default function Map() {
    const [currentPos, updateCurrentPos] = React.useState(null)
    const [locations, setLocations] = React.useState(null)
    const [ libraries ] = React.useState(['places']);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyBZ-L6y4RM_Adga1qdKEj8ZTMCBkMHE_3o",
        libraries
    })

    const mapContainerStyle = {
        width: '100%',
        height: "100%",
        borderRadius: '10px',
    }

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    }

    const getLocations = async (coords) => {
        const loc = await axios.post(`${config.API_BASE_URL}/getLocations`, coords)
        setLocations([...loc.data])
    }

    React.useEffect(() => {
        Geocode.setApiKey("AIzaSyBZ-L6y4RM_Adga1qdKEj8ZTMCBkMHE_3o")

        if (navigator.geolocation) {
	    	navigator.geolocation.getCurrentPosition(showPosition);
	  	} else {
            console.log("Geolocation is not supported by this browser.")
	  	}

        function showPosition(position) {
            const coords = {lat: position.coords.latitude, lng: position.coords.longitude}
            updateCurrentPos(coords)
            getLocations(coords)
        }
              
    }, []);

  return (
    <div className='Map'>
        {(isLoaded && currentPos && locations) &&
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={{lat: currentPos.lat, lng: currentPos.lng}}
                options={options}>
                    {locations.map((loc) => {
                        return (
                            <OverlayView
                                position={{lat: loc.lat, lng: loc.lng}}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            >
                            <div className='marker'>
                                <img src="" alt="img" />
                                <div>
                                    <h3>{loc.name}</h3>
                                    <p>Description...</p>
                                    <button>Open In Maps</button>
                                </div>
                            </div>
                            </OverlayView>
                        )
                    })}
            </GoogleMap>}
    </div>
  )
}
