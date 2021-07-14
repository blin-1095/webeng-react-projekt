// Import React 
import React, { useEffect, useState, useRef, useMemo } from "react";
// Import Framework7-React Plugin
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
// Import Leaflet Map
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
// Import Wiki API
import { reverseGeocoding } from "./wikiAPI";
//Import Leaflet Geosearch
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// Import Routing Machine
import RoutingMachine from "./routingMachine";
import { marker } from "leaflet";

const default_coordinates = [47.66, 9.48];

// Create Searchfield to search places
const SearchField = ({ onSearch }) => {
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

// Create marker when user clicks on map
function ClickMarker({ onClick, position, wikiResult, wikiResultText, setRoutingVisibility, routingVisibility }) {

  const map = useMapEvents({
    click(ev) {
      onClick(map, ev);
    }
  })

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
            <BlockTitle large>{wikiResult}</BlockTitle>
            <Block>
              <div>
                {wikiResultText}
              </div>
            </Block>
          </PageContent>
        </Sheet>
      </Popup>

    </Marker>
  )
}

// Create marker for current user location
function LocationMarker({ ownPosition, setOwnPosition }) {

  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setOwnPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    }).on("locationerror", function () {
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
      <Popup>You are here<br />(Drag me if I'm wrong)</Popup>
    </Marker>
  )
}


const MapObj = () => {

  const [wikiResult, setWikiResult] = useState('');
  const [wikiResultText, setWikiResultText] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [position, setPosition] = useState(null);
  const [ownPosition, setOwnPosition] = useState(null);
  const [routingVisibility, setRoutingVisibility] = useState(false);

  //zusammenfassen zu getLocationInfo damit Suche und Click gleich funktionieren
  const onClick = (map, ev) => {
    console.log(map.mouseEventToLatLng(ev.originalEvent))
    setPosition(map.mouseEventToLatLng(ev.originalEvent));
    setCoordinates(map.mouseEventToLatLng(ev.originalEvent));
    reverseGeocoding(map.mouseEventToLatLng(ev.originalEvent).lng, map.mouseEventToLatLng(ev.originalEvent).lat, setWikiResult, setWikiResultText);
    setRoutingVisibility(false);
  }

  const onSearch = (query) => {
    setPosition({ lng: query.result.x, lat: query.result.y })
    setCoordinates({ lng: query.result.x, lat: query.result.y })
    reverseGeocoding(query.result.x, query.result.y, setWikiResult, setWikiResultText);
  }

  const rMachine = useRef();
  // create some state variable, any state variable, to track changes
  const pointsToUse = [position, ownPosition];

  // useEffect which responds to changes in waypoints state variable
  useEffect(() => {
    if (rMachine.current && routingVisibility === true) {
      rMachine.current.setWaypoints(pointsToUse);
    } else if (rMachine.current && routingVisibility === false) {
      rMachine.current.setWaypoints(false);
    }
  }, [pointsToUse, rMachine]);

  return (
    <MapContainer center={default_coordinates} zoom={13} minZoom={3} maxBounds={[[-80, -170], [100, 190]]} scrollWheelZoom={true} maxBoundsViscosity={1}>
      <SearchField onSearch={onSearch} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        continuousWorld={false}
      />
      <LocationMarker ownPosition={ownPosition} setOwnPosition={setOwnPosition} />
      <ClickMarker onClick={onClick} ownPosition={ownPosition} position={position} wikiResult={wikiResult}
        wikiResultText={wikiResultText} setRoutingVisibility={setRoutingVisibility} routingVisibility={routingVisibility} />
      <RoutingMachine ref={rMachine} waypoints={pointsToUse} />
    </MapContainer>
  )
}


export default MapObj;
