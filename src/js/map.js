import React, { useEffect, useState, useRef, useMemo, Component } from "react";
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
import { reverseGeocoding } from "./wikiapi";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import RoutingMachine from "./routingmachine";

//coordinates used if location cant be determined
const default_coordinates = [47.66, 9.48];

/**
 * DestinationMarker Component, builds and places second marker with interactive popup
 * @param {*} getLocationInfo 
 * @param {*} position coordinates
 * @param {String} wikiResult title of WikiApi result
 * @param {String} wikiResultText text of WikiApi result
 * @param {boolean} setRoutingVisibility changes visibility of route
 * @param {boolean} routingVisibility check visibility of route
 * @returns {JSX.Element} marker with interactive popup
 */
function DestinationMarker({getLocationInfo, position, wikiResult, wikiResultText, setRoutingVisibility, routingVisibility}) {
  
  const provider = new OpenStreetMapProvider();

  //settings of searchbar
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'button',
    autoClose: true,
  });
  //clickevent
  const map = useMapEvents({
    click(ev) {
      getLocationInfo(map.mouseEventToLatLng(ev.originalEvent).lng, map.mouseEventToLatLng(ev.originalEvent).lat);
    }
  })
  //searchbarevent
  useEffect(() => {
    map.addControl(searchControl);
    map.on('geosearch/showlocation', (ev) => {
      getLocationInfo(ev.location.x, ev.location.y);
    })
    return () => map.removeControl(searchControl);
  }, [])
  
  return position === null ? null : (
    <Marker position={position}>  
      <Popup>
        <BlockTitle medium>{wikiResult}</BlockTitle>
        <Block strong>
          <Row>
          <Col tag="span">
            <Button style={{margin: '2px'}} raised outline round onClick={() => setRoutingVisibility(!routingVisibility)}>
              {routingVisibility ? "Remove Route" : "Plot Route"}
            </Button>
          </Col>
          </Row>
          <Row>
          <Col tag="span">
            <Button style={{margin: '2px'}} raised outline round sheetOpen=".wiki-sheet">
              Wikipedia
            </Button>
          </Col>
          </Row>
        </Block>

        <Sheet
          className="wiki-sheet"
          style={{ height: 'auto', '--f7-sheet-bg-color': '#fff' }}
          push
          >
          <Toolbar>
            <div className="left"></div>
            <div className="right">
              <Link sheetClose>Close</Link>
            </div>
          </Toolbar>
            <PageContent>
              <BlockTitle medium>{wikiResult}</BlockTitle>
              <Block>
                <div>
                  {wikiResultText.length > 500 ? wikiResultText.substring(0, 800) + '[...]' : wikiResultText }
                </div>
              </Block>
            </PageContent>
        </Sheet>
      </Popup>
      
    </Marker>
  )
}

/**
 * Sets user location marker
 * @param {*} ownPosition user location coordinates
 * @param {*} setOwnPosition set user location coordinates
 * @returns {JSX.Element} user location marker with popup
 */
function LocationMarker({ownPosition, setOwnPosition}) {

    const map = useMap();
    const markerRef = useRef(null);

    //check, if user can be located (true: save position / false: alert)
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setOwnPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      }).on("locationerror", function (){
        setOwnPosition(default_coordinates);
        alert('Could not find your current location');
      });
    }, [map]);

    //updates marker position, if dragged
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
  
/**
 * Combines leaflet map with marker and routing Components
 * @returns {JSX.Element} map Component
 */
const MapObj = () => {

    const [wikiResult, setWikiResult] = useState('');
    const [wikiResultText, setWikiResultText] = useState('');
    const [position, setPosition] = useState(null);
    const [ownPosition, setOwnPosition] = useState(null);
    const [routingVisibility, setRoutingVisibility] = useState(false);

    //Set position and uses WikiApi
    const getLocationInfo = (lng, lat) => {
      setPosition({lng: lng, lat: lat});
      reverseGeocoding(lng, lat, setWikiResult, setWikiResultText);
    }
    
    const rMachine = useRef();
    const pointsToUse = [position, ownPosition];
    
    //checks for routingVisibility (true: enable routing / false: disable routing)
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
            <DestinationMarker getLocationInfo={getLocationInfo} ownPosition={ownPosition} position={position} wikiResult={wikiResult} 
            wikiResultText={wikiResultText} setRoutingVisibility={setRoutingVisibility} routingVisibility={routingVisibility}/>
            <RoutingMachine ref={rMachine} waypoints={pointsToUse}/>
          </MapContainer>
    )
}


export default MapObj;
