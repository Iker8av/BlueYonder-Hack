import React from 'react'
import axios from 'axios';
import * as config from "../../config"
import './Map.css'
import {GoogleMap, useLoadScript, OverlayView, Marker, DirectionsRenderer} from "@react-google-maps/api"
import Geocode from "react-geocode";

export default function Map() {
    const [currentPos, updateCurrentPos] = React.useState(null)
    const [locations, setLocations] = React.useState(null)
    const [locSelected, setLocSelected] = React.useState(null)
    const [directions, updateDirections] = React.useState(null)
    const [ libraries ] = React.useState(['places']);
    const [loading, setLoading] = React.useState(true)

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyBZ-L6y4RM_Adga1qdKEj8ZTMCBkMHE_3o",
        libraries
    })

    const mapContainerStyle = {
        width: '100%',
        height: "100%",
        borderRadius: '15px',
    }

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false
    }

    const getLocations = async (coords) => {
        const loc = await axios.post(`${config.API_BASE_URL}/getLocations`, coords)
        setLocations([...loc.data])
    }

    const addClick = (id) => {
        axios.post(`${config.API_BASE_URL}/addClick`, {id})
    }

    const handleLoading = React.useCallback( async (event) => {
        if (locations) setLoading(false)
          
      }, [locations])

    const handleOpenInMaps = (address) => {
        window.open(
            `https://maps.google.com/?q=${address}`,
            '_blank'
        )
    }

    const GetDirections = (data) =>{
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: currentPos,
            destination: {lat: data.lat, lng: data.lng},
            travelMode: window.google.maps.TravelMode.DRIVING
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              updateDirections(result)
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }

    const manageClick = (loc) => {
        addClick(loc.objectId); 
        setLocSelected(loc);
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
    <div>
        <div className='Map'>
            { currentPos ? (isLoaded && currentPos && locations) &&
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={{lat: currentPos.lat, lng: currentPos.lng}}
                    options={options}
                    onLoad={() => handleLoading}>
                        <Marker position={{lat: currentPos.lat, lng: currentPos.lng}} />
                        {locations.map((loc) => {
                            return (
                                <OverlayView
                                    position={{lat: loc.lat, lng: loc.lng}}
                                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                    key={loc.objectId}
                                >
                                <div className='marker' onClick={() => {manageClick(loc)}}>
                                    <div>
                                        <h4>{loc.name}</h4>
                                        <p>{loc.address}</p>
                                        {loc.type && loc.type.map((type) => {return type && <p>{type}, </p>})}
                                        <p>Interactions: {loc.clicks}  -  Capacity: {loc.capacity}% </p>
                                        <div className='mapbuttons'>
                                            <button onClick={(e) => {handleOpenInMaps(loc.address); manageClick(loc)}}>Open In Maps</button>
                                            <button onClick={(e) => {GetDirections(loc); manageClick(loc)}}>Get Directions</button>
                                        </div>
                                    </div>
                                </div>
                                </OverlayView>
                                
                            )
                        })}
                        {directions && <DirectionsRenderer
                            directions={directions}/>}
                </GoogleMap> 
                : <img className='loading' src="https://parspng.com/wp-content/uploads/2021/11/arrowpng.parspng.com-16.png" alt="" />
                }
        </div>
    </div>
  )
}
