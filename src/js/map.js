import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { reverseGeocoding, WikiApi } from "./wikiAPI";


var default_coordinates = [47.66, 9.48];


function ClickMarker() {
    
    const [wikiResult, setWikiResult] = useState('');
    const [wikiResultUrl, setWikiResultUrl] = useState('');
    const [coordinates, setCoordinates] = useState(0);
    const [position, setPosition] = useState(null);
  
    const map = useMapEvents({
      click(ev) {
        setPosition(map.mouseEventToLatLng(ev.originalEvent));
        setCoordinates(map.mouseEventToLatLng(ev.originalEvent));
        console.log(coordinates.lng + coordinates.lat);
      }
    })
    
    reverseGeocoding(coordinates.lng, coordinates.lat, setWikiResult, setWikiResultUrl);

    return position === null ? null : (
      <Marker position={position} >
        
        <Popup>
          <WikiApi wikiResult = {wikiResult} wikiResultUrl = {wikiResultUrl}/>
        </Popup>
        
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
        setPosition(default_coordinates);
        alert('Could not find your current location');
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
        <MapContainer center={default_coordinates} zoom={13} worldCopyJump={true} scrollWheelZoom={true}>
            <SearchField  />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <ClickMarker />
        </MapContainer>
    )
}

import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
const SearchField = () => {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'button'
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [])

  return null;
}

export default MapObj;