import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import getLocation from './location';


const Map = () => {

    var coordinates = [51.505, -0.09];

    getLocation()
            .then(function (result) {
                console.log(result)
                console.log('RESULT ABOVE ME')
                if (!result === undefined){
                    coordinates = [result.latitude, result.longitude]
                }
            });

    return (
        <MapContainer center={coordinates} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coordinates}>
                <Popup>
                    Your current location.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;