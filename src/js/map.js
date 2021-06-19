import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { reverseGeocoding, WikiApi } from "./wikiAPI";


var default_coordinates = [47.66, 9.48];


function ClickMarker({onClick, position, wikiResult, wikiResultUrl}) {
  
    const map = useMapEvents({
      click(ev) {
        onClick(map, ev);
      }
    })
    
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

    return (
        <MapContainer center={default_coordinates} zoom={13} worldCopyJump={true} scrollWheelZoom={true}>
            <SearchField onSearch={onSearch} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <ClickMarker onClick={onClick} position={position} wikiResult={wikiResult} wikiResultUrl={wikiResultUrl} />
            </MapContainer>
    )
}

import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
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

export default MapObj;