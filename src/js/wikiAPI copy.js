import { value } from 'dom7';
import React, { useState } from 'react';

class WikiApi2 extends React.Component {
    WikiApi(coordinates){
        var coordinates = coordinates;
        var cityName;
        var wikiResult;
        var wikiResultUrl;
    }
    
    componentDidMount(){
        setTimeout(this.reverseGeocoding(this.coordinates.lng, this.coordinates.lat) ,1000);
        
    }
    
    reverseGeocoding(lon, lat) {
        fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).
        then(function(response) {
            return response.json();
        }).
        then(function(json) {
            console.log(json.display_name);
            //document.getElementById('location').innerHTML = json.display_name;

            const add = json.display_name.split(', ');
            const pos = {streetNo: add[0], street: add[1], suburb: add[2], city: add[3], county: add[4], country: add[5], zip: add[6], state: add[7] };
            this.cityName = pos['city'];
        })
        //.then(function() {useWikiApi()})
        
    }

    useWikiApi() {
        

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
                fetch(urlPageId)
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(response){
                        setWikiResultUrl(response.query.pages[pageId].fullurl)
                    })
            })
    }

    render() {
        return (
            //reverseGeocoding(coordinates.lng, coordinates.lat)
            <div >
                {this.cityName}
            </div>
            
        )
    }
    
}

export default WikiApi2;