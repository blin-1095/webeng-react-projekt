/**
 * Fetches location information from the Wikipedia API around the position of the DestinationMarker
 * @param {*} lon Longitude of position
 * @param {*} lat Latitude of position
 * @param {*} setWikiResult Hook to save title of WikiApi result
 * @param {*} setWikiResultText Hook to save preview text of WikiApi result
 */

export async function reverseGeocoding(lon, lat, setWikiResult, setWikiResultText) {

    setWikiResult("Loading result...");
    setWikiResultText("Loading...")

    try{
        //first search Wikipedia for relevant results in given radius
        const wiki_url = `https://de.wikipedia.org/w/api.php?origin=*&action=query&list=geosearch&gsradius=10000&gscoord=`+ lat + `|`+ lon +`&format=json`;
        const wiki_response = await fetch(wiki_url);
        const wiki_json = await wiki_response.json();

        try{
            //then request detailed information of the most relevant result
            const pageId = wiki_json.query.geosearch[0].pageid;
            const urlPageId = `https://de.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&pageids=${pageId}&redirects=1&format=json`;
    
            const wiki_page_response = await fetch(urlPageId);
            const wiki_page = await wiki_page_response.json();
    
            setWikiResult(wiki_json.query.geosearch[0].title);
            setWikiResultText(wiki_page.query.pages[pageId].extract);
    
        }catch{
            setWikiResult("No result.");
            setWikiResultText(" ");
        }
    
    }catch{
        alert('Could not get Wikipedia-Info. Please check your internet connection.')
        setWikiResult("No result.");
        setWikiResultText(" ");
    }

}
