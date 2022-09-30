// const fetch = require('node-fetch');

// async function fetchNews() {
//     // https://dmitripavlutin.com/javascript-fetch-async-await/
//     // fetching two pages from the lineup
//     const [page1, page2] = await Promise.all([
//     fetch('https://services.radio-canada.ca/neuro/v1/topics/1005685?pagenumber=1'),
//     fetch('https://services.radio-canada.ca/neuro/v1/topics/1005685?pagenumber=2')
//     ]);
//     const page1Json = await page1.json();
//     const pag2Json = await page2.json();
//     //console.log([page1, page2]);
    
//     // keeping only the selfLink and the codeName, page 1
//     let newsIdArray1 = page1Json.items.map(id => {
//             return {
//                 id: id.referredContent.id
//                 // for /topics endpoints, the structure is a bit different! items>referredContent>id
//             }
//     });
    
//     // keeping only the selfLink and the codeName, page 2
//     let newsIdArray2 = pag2Json.items.map(id => {
//             return {
//                 id: id.referredContent.id
//                 // for /topics endpoints, the structure is a bit different! items>referredContent>id
//             }
//     });

//     // concat the two pages
//     let newsIdFull = newsIdArray1.concat(newsIdArray2);

//     // filter for unique id
//     const key = 'id';
//     const arrayUniqueByKey = [...new Map(newsIdFull.map(item =>
//     [item[key], item])).values()];
    
//     //console.log(arrayUniqueByKey);
    
//     // looping over every item, and fetching its full endpoint
//     for (const newsData of arrayUniqueByKey){
//             let url = `https://services.radio-canada.ca/neuro/v1/news-stories/${newsData.id}`;
// //             console.log(url);
//             let newsDataRequest = await fetch(url);
//             let data = await newsDataRequest.json();
//             newsData.address = data;
//     }
    
//     //console.log(newsIdFull);
//     return newsIdFull;
    
//  }


// module.exports = fetchNews();


// nouvelle tentative
// https://developer.here.com/blog/integrating-geojson-in-your-static-sites

const fetch = require('node-fetch');
const Cache = require("@11ty/eleventy-fetch");

module.exports = async function() {
    let lineupdata = await Cache("https://services.radio-canada.ca/neuro/v1/topics/1005685", { 
              duration: "2m", // 2minutes
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