// nouvelle tentative
// https://developer.here.com/blog/integrating-geojson-in-your-static-sites

const fetch = require('node-fetch');
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
    let lineupdata = await Cache("https://services.radio-canada.ca/neuro/v1/topics/1005685", { 
              duration: "2h", // 2h
              type: "json" // also supports "text" or "buffer"
            });       

    let newsId = lineupdata.items.map(c => {
        return {
            id: c.referredContent.id
            // for /topics endpoints, the structure is a bit different! items>referredContent>id
        }
    });

    //https://stackoverflow.com/a/37576787/52160
    for(const newsData of newsId) {
        if (newsData.id != null){

        let url = `https://services.radio-canada.ca/neuro/v1/news-stories/${newsData.id}`;

        let newsDataRequest = await fetch(url);
        let location = await newsDataRequest.json();
        newsData.address = location;
        }
    }    
    return newsId;
}