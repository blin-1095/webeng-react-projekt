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

    return (
        <MapContainer center={coordinates} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <ClickMarker />
        </MapContainer>
    )
}

export default MapObj;