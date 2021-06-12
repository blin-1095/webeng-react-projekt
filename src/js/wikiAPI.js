import { value } from 'dom7';
import React, { useState } from 'react';

const WikiApi = ({coordinates}) => {
    const [cityName, setCityName] = useState ('')
    const [wikiResult, setWikiResult] = useState('')
    const [wikiResultUrl, setWikiResultUrl] = useState('')
    console.log(coordinates);

    
    
    function reverseGeocoding(lon, lat) {
        fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).
        then(function(response) {
            return response.json();
        }).
        then(function(json) {
            console.log(json.display_name);
            //document.getElementById('location').innerHTML = json.display_name;

            const add = json.display_name.split(', ');
            const pos = {streetNo: add[0], street: add[1], suburb: add[2], city: add[3], county: add[4], country: add[5], zip: add[6], state: add[7] };
            setCityName(pos['city']);
        })
        .then(function() {useWikiApi()})
        
    }

    function useWikiApi() {
        

        var url = "https://en.wikipedia.org/w/api.php?origin=*";
        var params = {
            action: 'query',
            list: 'search',
            srsearch: cityName,
            format: 'json'
          };
          Object.keys(params).forEach((key) => {
            url += "&" + key + "=" + params[key];
          });
          fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function(response){
                console.log(response);
                var pageId = response.query.search[0].pageid;
                var urlPageId = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageId}&inprop=url&format=json`;
                setWikiResult(response.query.search[0].title)
                fetch(urlPageId)
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(response){ 
                        setWikiResultUrl(response.query.pages[pageId].fullurl)
                    })
            })
    }

    return (
        //reverseGeocoding(coordinates.lng, coordinates.lat)
        //onLoadStart={setTimeout(reverseGeocoding(coordinates.lng, coordinates.lat), 5000)}
        <div >
            <a href={wikiResultUrl}>{wikiResult}</a>
        </div>
        
    )
}

export default WikiApi;