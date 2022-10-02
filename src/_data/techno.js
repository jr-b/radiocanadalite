const fetch = require('node-fetch');

async function fetchNews() {
    // https://dmitripavlutin.com/javascript-fetch-async-await/
    // fetching two pages from the lineup
    const [page1, page2] = await Promise.all([
    fetch('https://services.radio-canada.ca/neuro/v1/lineups/4169?pagenumber=1'),
    fetch('https://services.radio-canada.ca/neuro/v1/lineups/4169?pagenumber=2')
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
//             console.log(url);
            let newsDataRequest = await fetch(url);
            let data = await newsDataRequest.json();
            newsData.address = data;
    }
}
    
    //console.log(newsIdFull);
    return newsIdFull;
    
}


module.exports = fetchNews();4169