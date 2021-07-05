import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  Row,
  Col,
  Button,
  Segmented,
  Sheet,
  PageContent,
  Toolbar,
  Link
} from 'framework7-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { reverseGeocoding, WikiApi } from "./wikiAPI";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import parser from "html-react-parser";

var default_coordinates = [47.66, 9.48];


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

// function createWikiSheet(){

//   return(
    
//   )
// }


function ClickMarker({onClick, position, wikiResult, wikiResultText}) {
  
    const map = useMapEvents({
      click(ev) {
        onClick(map, ev);
      }
    })
    
    return position === null ? null : (
      <Marker position={position} >
        
        <Popup>
          <WikiApi wikiResult = {wikiResult} wikiResultText = {wikiResultText}/>
          <BlockTitle large>{wikiResult}</BlockTitle>
          <Block strong>
            <Row>
            <Col tag="span">
              <Button raised outline round>
                Plot route
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
    const [wikiResultText, setWikiResultText] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [position, setPosition] = useState(null);

    const onClick = (map, ev) => {
      console.log(map.mouseEventToLatLng(ev.originalEvent))
        setPosition(map.mouseEventToLatLng(ev.originalEvent));
        setCoordinates(map.mouseEventToLatLng(ev.originalEvent));
        reverseGeocoding(map.mouseEventToLatLng(ev.originalEvent).lng, map.mouseEventToLatLng(ev.originalEvent).lat, setWikiResult, setWikiResultText);
    }

    const onSearch = (query) => {
      setPosition({lng: query.result.x, lat: query.result.y})
      setCoordinates({lng: query.result.x, lat: query.result.y})
      reverseGeocoding(query.result.x, query.result.y, setWikiResult, setWikiResultText);
    }

    return (
        <MapContainer center={default_coordinates} zoom={13} worldCopyJump={true} scrollWheelZoom={true}>
            <SearchField onSearch={onSearch} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                continuousWorld={false}
            />
            <LocationMarker />
            <ClickMarker onClick={onClick} position={position} wikiResult={wikiResult} wikiResultText={wikiResultText} />
            </MapContainer>
    )
}


export default MapObj;
