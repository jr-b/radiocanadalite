const fetch = require('node-fetch');

async function fetchNews() {
    // https://dmitripavlutin.com/javascript-fetch-async-await/
    // fetching two pages from the lineup
    const [page1, page2] = await Promise.all([
    fetch('https://services.radio-canada.ca/neuro/v1/lineups/92408?pagenumber=1'),
    fetch('https://services.radio-canada.ca/neuro/v1/lineups/92408?pagenumber=2')
    ]);
    const page1Json = await page1.json();
    const pag2Json = await page2.json();
    //console.log([page1, page2]);
    
    // keeping only the selfLink and the codeName, page 1
    let newsIdArray1 = page1Json.contentItemSummaries.items.map(id => {
            return {
                id: id.selfLink,
                type: id.classificationTag.codeName
            }
    });
    
    // keeping only the selfLink and the codeName, page 2
    let newsIdArray2 = pag2Json.contentItemSummaries.items.map(id => {
            return {
                id: id.selfLink,
                type: id.classificationTag.codeName
            }
    });

    // concat the two pages
    let newsIdFull = newsIdArray1.concat(newsIdArray2);
    
       //console.log(newsIdFull);
    
    // looping over every item, and fetching its full endpoint
    for (const newsData of newsIdFull){
            if (newsData.id !== null){
            let url = `${newsData.id.href}`;
//           console.log(url);
            let newsDataRequest = await fetch(url);
            let data = await newsDataRequest.json();
            newsData.address = data;
            }
    }
    
    //console.log(newsIdFull);
    return newsIdFull;
    
}


module.exports = fetchNews();







// ====== OLD VERSION BELOW =====

// // https://developer.here.com/blog/integrating-geojson-in-your-static-sites

// const fetch = require('node-fetch');
// const Cache = require("@11ty/eleventy-fetch");

// module.exports = async function() {
//     let lineupdata = await Cache("https://services.radio-canada.ca/neuro/v1/lineups/92408", { 
//         duration: "2m", // 2minutes
//               type: "json" // also supports "text" or "buffer"
//             });       

//     let newsId = lineupdata.contentItemSummaries.items.map(c => {
//             return {
//                 id: c.selfLink,
//                 type: c.classificationTag.codeName
//             }
//     });

//     let newsIdFiltered = newsId.filter(
//         n => {
//             if (n.type !== 'adhoc' ) {
//                 { return n }
//             }
//         });
    
//     //console.log(newsIdFiltered);

//     //https://stackoverflow.com/a/37576787/52160
//     for(const newsData of newsIdFiltered) {
//         //console.log(newsData.type);
//         if (newsData.id !== null){
//             //console.log(newsData);
//             let url = `${newsData.id.href}`;
//             let newsDataRequest = await fetch(url);
//             let location = await newsDataRequest.json();
//             newsData.address = location;
//         }
//     }        
//     //console.log(newsIdFiltered)
//     return newsIdFiltered;
// }
