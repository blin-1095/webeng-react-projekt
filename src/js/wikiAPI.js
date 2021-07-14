export async function reverseGeocoding(lon, lat, setWikiResult, setWikiResultText) {


    setWikiResult("Loading result...");
    setWikiResultText("Loading...")
    
    const wiki_url = `https://de.wikipedia.org/w/api.php?origin=*&action=query&list=geosearch&gsradius=10000&gscoord=`+ lat + `|`+ lon +`&format=json`;
    const wiki_response = await fetch(wiki_url);
    const wiki_json = await wiki_response.json();

    try{
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
        
    
}
