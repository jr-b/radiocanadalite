
const fetch = require("node-fetch");

async function fetchAndConcatenateJSON(url) {
  let concatenatedJSON = [];

  let currentPage = 1;
  let lastPage = false;

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  while (!lastPage) {
    let tempUrl = url + "?pagenumber=" + currentPage;
    const response = await fetch(tempUrl);
    const json = await response.json();

    if (json.contentItemSummaries.items) {
      concatenatedJSON.push(...json.contentItemSummaries.items);
    }

    const { contentItemSummaries } = json;
    if (contentItemSummaries.nextPageLink === null) {
      lastPage = true;
    } else {
      currentPage++;
    }
  }

  let newsIdArray = concatenatedJSON.map((item) => {
    return {
      id: item.id,
      type: item.classificationTag.codeName,
    };
  });

  let filteredNewsIdArray = newsIdArray.filter(onlyUnique);
  console.log(filteredNewsIdArray);

  let fullNews = [];
  for (const newsData of filteredNewsIdArray) {
    if (newsData.type === "nouvelle" && newsData.id !== null) {
      let newsUrl =
        "https://services.radio-canada.ca/neuro/v1/news-stories/" + newsData.id;
      const newsDataRequest = await fetch(newsUrl);
      const dataJson = await newsDataRequest.json();
      fullNews.push(dataJson);
    }
  }

  return fullNews;
}

let urlList = "https://services.radio-canada.ca/neuro/v1/lineups/96";

module.exports = fetchAndConcatenateJSON(urlList)
  .then((fullNews) => {
    return fullNews;
  })
  .catch((error) => {
    console.error("Error:", error);
  });



// const fetch = require("node-fetch");

// async function fetchAndConcatenateJSON(url) {
//   let concatenatedJSON = [];

//   let currentPage = 1;
//   let lastPage = false;

//   function onlyUnique(value, index, array) {
//     return array.indexOf(value) === index;
//   }

//   // call each page available
//   // build concatenatedJSON array with the items returned
//   while (!lastPage) {
//     let tempUrl = url + "?pagenumber=" + currentPage;
//     const response = await fetch(tempUrl);
//     const json = await response.json();

//     concatenatedJSON.push(...json.contentItemSummaries.items);

//     const { contentItemSummaries } = json;
//     if (contentItemSummaries.nextPageLink === null) {
//       lastPage = true;
//     } else {
//       currentPage++;
//     }
//   }

//   // build list of news id into an array
//   let newsIdArray = concatenatedJSON.map((item) => {
//     return {
//       id: item.selfLink,
//       type: item.classificationTag.codeName,
//     };
//   });

//   let filteredNewsIdArray = [...new Set(newsIdArray)];
//   console.log(filteredNewsIdArray);

//   let fullNews = [];
//   // looping over every item, and fetching its full data
//   for (const newsData of filteredNewsIdArray) {
//     if (newsData.id !== null) {
//       let newsUrl = `${newsData.id.href}`;
//       const newsDataRequest = await fetch(newsUrl);
//       const dataJson = await newsDataRequest.json();
//       fullNews.push(dataJson);
//     }
//   }

//   return fullNews;
// }

// let urlList = "https://services.radio-canada.ca/neuro/v1/lineups/96";

// module.exports = fetchAndConcatenateJSON(urlList)
//   .then((fullNews) => {
//     return fullNews;
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
