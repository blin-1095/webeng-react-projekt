// Function to use reverse geocoding
export async function reverseGeocoding(lon, lat, setWikiResult, setWikiResultText) {

    const query_url = 'https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat;
    console.log(query_url)
    const osm_response = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat);
    console.log(lon, lat);
    const osm_json = await osm_response.json();


    if (lon != undefined && lat != undefined) {
        const add = osm_json.display_name.split(', ');
        //const pos = {streetNo: add[0], street: add[1], suburb: add[2], city: add[3], county: add[4], country: add[5], zip: add[6], state: add[7] };
        const betterCity = osm_json.address.village || osm_json.address.city_district || osm_json.address.town || osm_json.address.city;

        const wiki_url = `https://de.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${encodeURIComponent(betterCity)}&format=json`;
        console.log(wiki_url);
        const wiki_response = await fetch(wiki_url);
        const wiki_json = await wiki_response.json();

        // Trying to find wikipedia article
        try {
            const pageId = wiki_json.query.search[0].pageid;
            const urlPageId = `https://de.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&pageids=${pageId}&redirects=1&format=json`;

            const wiki_page_response = await fetch(urlPageId);
            const wiki_page = await wiki_page_response.json();

            setWikiResult(wiki_json.query.search[0].title);
            setWikiResultText(wiki_page.query.pages[pageId].extract);


        } catch {
            setWikiResult("No result.");
            setWikiResultText(" ");
        }

    }
}
