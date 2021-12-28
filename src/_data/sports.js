// https://developer.here.com/blog/integrating-geojson-in-your-static-sites

const fetch = require('node-fetch');
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
    let lineupdata = await Cache("https://services.radio-canada.ca/neuro/v1/lineups/771", { 
              duration: "2h", // 2h
              type: "json" // also supports "text" or "buffer"
            });       

    let newsId = lineupdata.contentItemSummaries.items.map(c => {
        return {
            id: c.selfLink,
            type: c.classificationTag.codeName
        }
    });
    //console.log(newsId.type);
    //https://stackoverflow.com/a/37576787/52160
    for(const newsData of newsId) {
        //console.log(newsData.type);
        if (newsData.id !== null){
            //console.log(newsData.type);
            let url = `${newsData.id.href}`;
            let newsDataRequest = await fetch(url);
            let location = await newsDataRequest.json();
            newsData.address = location;
        }
    }        
    //console.log(newsId);
    return newsId;
}
