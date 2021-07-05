import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { reverseGeocoding, WikiApi } from "./wikiAPI";
import RoutingMachine from "./routingMachine";
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

function ClickMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(ev) {
        setPosition(map.mouseEventToLatLng(ev.originalEvent));
      }
    })
  
    return position === null ? null : (
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

    //add marker +180, -180
    return (
        <MapContainer center={coordinates} zoom={13} scrollWheelZoom={true} minZoom={3} worldCopyJump={true} maxBoundsViscosity={1.0}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                continuousWorld={false}
            />
            <LocationMarker />
            <ClickMarker onClick={onClick} position={position} wikiResult={wikiResult} wikiResultUrl={wikiResultUrl} />
        </MapContainer>
    )
}



export default MapObj;
