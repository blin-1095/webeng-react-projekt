import React, { useState } from 'react';


export const WikiApi = ({wikiResult, wikiResultUrl}) => {
    return(
        <div >
            <a href={wikiResultUrl}>{wikiResult}</a>
        </div>
    )
}


export async function reverseGeocoding(lon, lat, setWikiResult, setWikiResultUrl) {
    
    const query_url = 'https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat;
    console.log(query_url)
    const osm_response = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat);
    console.log(lon, lat);
    const osm_json = await osm_response.json();


    if (lon != undefined && lat != undefined){
        const add = osm_json.display_name.split(', ');
        const pos = {streetNo: add[0], street: add[1], suburb: add[2], city: add[3], county: add[4], country: add[5], zip: add[6], state: add[7] };
        const betterCity = osm_json.address.village || osm_json.address.city_district || osm_json.address.town;
        
        const wiki_url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${encodeURIComponent(betterCity)}&format=json`;
        console.log(wiki_url);
        const wiki_response = await fetch(wiki_url);
        const wiki_json = await wiki_response.json();

        try{
            const pageId = wiki_json.query.search[0].pageid;
            const urlPageId = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageId}&inprop=url&format=json`;

            const wiki_page_response = await fetch(urlPageId);
            const wiki_page = await wiki_page_response.json();

            console.log(wiki_json.query.search[0]);
            setWikiResult(wiki_json.query.search[0].title);
            setWikiResultUrl(wiki_page.query.pages[pageId].fullurl);
        }catch{
            setWikiResult("No result.");
            setWikiResultUrl(" ");
        }

        
    }
}
