import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  BlockTitle,
  Block,
  Row,
  Col,
  Button,
  Sheet,
  PageContent,
  Toolbar,
  Link
} from 'framework7-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { reverseGeocoding } from "./wikiAPI";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import RoutingMachine from "./routingMachine";

const default_coordinates = [47.66, 9.48];

// const SearchField = ({onSearch}) => {
//   const provider = new OpenStreetMapProvider();

//   // @ts-ignore
//   const searchControl = new GeoSearchControl({
//     provider: provider,
//     style: 'button',
//     popupFormat: (query, result) => {
//       console.log(query);
//       //return query.result.label;
//       onSearch(query)
//       return query.result.label;
//     },
//   });

//   const map = useMap();
//   useEffect(() => {
//     map.addControl(searchControl);
//     return () => map.removeControl(searchControl);
//   }, [])

//   return null;
// }


function SecondMarker({onSearch, onClick, position, wikiResult, wikiResultText, setRoutingVisibility, routingVisibility}) {
  
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'button',
    autoClose: true,
  });

  const map = useMapEvents({
    click(ev) {
      onClick(map, ev);
    }
  })


  useEffect(() => {
    map.addControl(searchControl);
    map.on('geosearch/showlocation', (ev) => {
      onSearch(ev);
    })
    return () => map.removeControl(searchControl);
  }, [])
  
  return position === null ? null : (
    <Marker position={position}>  
      <Popup>
        <BlockTitle large>{wikiResult}</BlockTitle>
        <Block strong>
          <Row>
          <Col tag="span">
            <Button raised outline round onClick={() => setRoutingVisibility(!routingVisibility)}>
              {routingVisibility ? "Remove Route" : "Plot Route"}
            </Button>
          </Col>
          </Row>
          <Row>
          <Col tag="span">
            <Button raised outline round sheetOpen=".wiki-sheet">
              Wikipedia
            </Button>
          </Col>
          </Row>
        </Block>

        <Sheet
          className="wiki-sheet"
          style={{ height: 'auto', '--f7-sheet-bg-color': '#fff', 'overflow': 'visible' }}
          push
          >
          <Toolbar>
            <div className="left"></div>
            <div className="right">
              <Link sheetClose>Close</Link>
            </div>
          </Toolbar>
            <PageContent>
              <BlockTitle large>{wikiResult}</BlockTitle>
              <Block>
                <div>
                  {'Nicht fertig'}
                  {wikiResultText.length > 500 ? wikiResultText.substring(0, 500) : wikiResultText }
                </div>
              </Block>
            </PageContent>
        </Sheet>
      </Popup>
      
    </Marker>
  )
}


function LocationMarker({ownPosition, setOwnPosition}) {

    const map = useMap();
    const markerRef = useRef(null);

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setOwnPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      }).on("locationerror", function (){
        setOwnPosition(default_coordinates);
        alert('Could not find your current location');
      });
    }, [map]);
  
    const eventHandlers = useMemo(() => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setOwnPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )

    return ownPosition === null ? null : (
      <Marker draggable={true} position={ownPosition} eventHandlers={eventHandlers} ref={markerRef}>
        <Popup>You are here<br/>(Drag me if I'm wrong)</Popup>
      </Marker>
    )
  }
  

const MapObj = () => {

    const [wikiResult, setWikiResult] = useState('');
    const [wikiResultText, setWikiResultText] = useState('');
    const [position, setPosition] = useState(null);
    const [ownPosition, setOwnPosition] = useState(null);
    const [routingVisibility, setRoutingVisibility] = useState(false);

    //zusammenfassen zu getLocationInfo damit Suche und Click gleich funktionieren
    const onClick = (map, ev) => {
      setPosition(map.mouseEventToLatLng(ev.originalEvent));
      reverseGeocoding(map.mouseEventToLatLng(ev.originalEvent).lng, map.mouseEventToLatLng(ev.originalEvent).lat, setWikiResult, setWikiResultText);
      //nicht fertig
      setRoutingVisibility(false);
    }

    const onSearch = (query) => {
      console.log(query.location)
      setPosition({lng: query.location.x, lat: query.location.y});
      reverseGeocoding(query.location.x, query.location.y, setWikiResult, setWikiResultText);
    }
    
    const rMachine = useRef();
    const pointsToUse = [position, ownPosition];

    useEffect(() => {
      if (rMachine.current && routingVisibility === true) {
        rMachine.current.setWaypoints(pointsToUse);
      }else if(rMachine.current && routingVisibility === false){
        rMachine.current.setWaypoints(false);
      }
    }, [pointsToUse, rMachine]);

    return (
        <MapContainer center={default_coordinates} zoom={13} minZoom={3} maxBounds={[[-80,-170], [100,190]]} scrollWheelZoom={true} maxBoundsViscosity={1}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                continuousWorld={false}
            />
            <LocationMarker ownPosition={ownPosition} setOwnPosition={setOwnPosition}/>
            <SecondMarker onSearch={onSearch} onClick={onClick} ownPosition={ownPosition} position={position} wikiResult={wikiResult} 
            wikiResultText={wikiResultText} setRoutingVisibility={setRoutingVisibility} routingVisibility={routingVisibility}/>
            <RoutingMachine ref={rMachine} waypoints={pointsToUse}/>
          </MapContainer>
    )
}


export default MapObj;
