<<<<<<< Updated upstream
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
=======
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
<<<<<<< Updated upstream
=======
import { reverseGeocoding, WikiApi } from "./wikiAPI";
import RoutingMachine from "./routingMachine";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

>>>>>>> Stashed changes


<<<<<<< Updated upstream
var coordinates = [47.66, 9.48];
=======
const SearchField = ({onSearch}) => {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'button',
    popupFormat: (query, result) => {
      console.log(query);
      //return query.result.label;
      onSearch(query)
      return query.result.label;
    },
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [])

  return null;
}

function test123(){
  console.log("test123")
}
>>>>>>> Stashed changes

function ClickMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(ev) {
        setPosition(map.mouseEventToLatLng(ev.originalEvent));
      }
    })
  
    return position === null ? null : (
<<<<<<< Updated upstream
      <Marker position={position}>
        <Popup>Chosen location.</Popup>
=======
      <Marker position={position} >
        
        <Popup>
          <WikiApi wikiResult = {wikiResult} wikiResultUrl = {wikiResultUrl}/>
          <div class="block block-strong">
            <div class="column">
              <button class="col button button-outline button-round" click={test123()}>Plot route</button>
              //onclick sheet öffnen
              <button class="col button button-outline button-round">Wikipedia</button>
            </div>
          </div>
        </Popup>
        
>>>>>>> Stashed changes
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
      <Marker draggable={true} position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  

const MapObj = () => {
<<<<<<< Updated upstream
=======
    const [wikiResult, setWikiResult] = useState('');
    const [wikiResultUrl, setWikiResultUrl] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [position, setPosition] = useState(null);

    const onClick = (map, ev) => {
      console.log(map.mouseEventToLatLng(ev.originalEvent))
        setPosition(map.mouseEventToLatLng(ev.originalEvent));
        setCoordinates(map.mouseEventToLatLng(ev.originalEvent));
        reverseGeocoding(map.mouseEventToLatLng(ev.originalEvent).lng, map.mouseEventToLatLng(ev.originalEvent).lat, setWikiResult, setWikiResultUrl);
    }

    const onSearch = (query) => {
      setPosition({lng: query.result.x, lat: query.result.y})
      setCoordinates({lng: query.result.x, lat: query.result.y})
      reverseGeocoding(query.result.x, query.result.y, setWikiResult, setWikiResultUrl);
      
    }
>>>>>>> Stashed changes

    //add marker +180, -180
    return (
        <MapContainer center={coordinates} zoom={13} scrollWheelZoom={true} minZoom={3} worldCopyJump={true} maxBoundsViscosity={1.0}>
>>>>>>> Stashed changes
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                continuousWorld={false}
            />
<<<<<<< Updated upstream
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
=======
            <LocationMarker />
            <ClickMarker onClick={onClick} position={position} wikiResult={wikiResult} wikiResultUrl={wikiResultUrl} />
>>>>>>> Stashed changes
        </MapContainer>
    )
}

<<<<<<< Updated upstream
export default Map;
=======


export default MapObj;
>>>>>>> Stashed changes
