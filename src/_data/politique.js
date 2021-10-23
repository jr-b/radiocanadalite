// https://developer.here.com/blog/integrating-geojson-in-your-static-sites

const fetch = require('node-fetch');
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
    let lineupdata = await Cache("https://services.radio-canada.ca/neuro/v1/lineups/4175", { 
              duration: "2h", // 2h
              type: "json" // also supports "text" or "buffer"
            });       

    let newsId = lineupdata.contentItemSummaries.items.map(c => {
        return {
            id: c.selfLink
        }
    });

    //https://stackoverflow.com/a/37576787/52160
    for(const newsData of newsId) {
        if (newsData.id != null){
        let url = `${newsData.id.href}`;

        let newsDataRequest = await fetch(url);
        let location = await newsDataRequest.json();
        newsData.address = location;
        }
    }
    return newsId;
}