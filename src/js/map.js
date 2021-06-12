<<<<<<< Updated upstream
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
=======
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';


var coordinates = [47.66, 9.48];

function ClickMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(ev) {
        setPosition(map.mouseEventToLatLng(ev.originalEvent));
      }
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>Chosen location.</Popup>
      </Marker>
    )
  }


function LocationMarker() {
    const [position, setPosition] = useState(null);

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      }).on("locationerror", function (){
        setPosition(coordinates);
        alert('Could not find location')
      });
    }, [map]);
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  

const MapObj = () => {

    //add marker +180, -180
    return (
        <MapContainer center={coordinates} zoom={13} scrollWheelZoom={true} minZoom={3} worldCopyJump={true} maxBoundsViscosity={1.0}>
>>>>>>> Stashed changes
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                continuousWorld={false}
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;