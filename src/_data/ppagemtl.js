// const fetch = require("node-fetch");

// // https://services.radio-canada.ca/neuro/sphere/v1/lineups/4159?pageNumber=2

// async function fetchAndConcatenateJSON(url) {
//   let concatenatedJSON = [];

//   let currentPage = 1;
//   let lastPage = false;

//   // call each page available
//   // build concatenatedJSON array with the items returned
//   while (!lastPage) {
//     let tempUrl = url + "?pageNumber=" + currentPage;
//     const response = await fetch(tempUrl);
//     const json = await response.json();
//     //console.log(json);

//     concatenatedJSON.push(...json.items);

//     const { pagedConfiguration } = json;
//     if (pagedConfiguration.nextPageUrl === null) {
//       lastPage = true;
//     } else {
//       currentPage++;
//     }
//   }

//   //console.log(concatenatedJSON);

//   // build list of news id into an array
//   let newsIdArray = concatenatedJSON.map((item) => {

//     return {
//       id: item.id,
//       type: item.contentTypeId
//     };
//   });

//   //console.log(newsIdArray);

//   let fullNews = [];
//   // looping over every item, and fetching its full data
//   for (const newsData of newsIdArray) {
//     if (newsData.type == "NewsStory" && newsData.type !== null) {
//       let newsUrl = "https://services.radio-canada.ca/neuro/v1/news-stories/" + newsData.id;
//       //console.log(newsUrl);
//       const newsDataRequest = await fetch(newsUrl);
//       const dataJson = await newsDataRequest.json();
//       //console.log(dataJson);
//       fullNews.push(dataJson);
//     }
//   }

//   return fullNews;
// }

// let urlList = "https://services.radio-canada.ca/neuro/v1/lineups/4159";

// module.exports = fetchAndConcatenateJSON(urlList)
//   .then((fullNews) => {
//     return fullNews;
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });


const fetch = require("node-fetch");

async function fetchAndConcatenateJSON(url) {
  let concatenatedJSON = [];

  let currentPage = 1;
  let lastPage = false;

  while (!lastPage) {
    let tempUrl = url + "?pageNumber=" + currentPage;
    const response = await fetch(tempUrl);
    const json = await response.json();

    if (json.items) {
      concatenatedJSON.push(...json.items);
    }

    const { pagedConfiguration } = json;
    if (pagedConfiguration.nextPageUrl === null) {
      lastPage = true;
    } else {
      currentPage++;
    }
  }

  let newsIdArray = concatenatedJSON.map((item) => {
    return {
      id: item.id,
      type: item.contentTypeId,
    };
  });

  let fullNews = [];
  for (const newsData of newsIdArray) {
    if (newsData.type === "NewsStory" && newsData.id !== null) {
      let newsUrl =
        "https://services.radio-canada.ca/neuro/v1/news-stories/" + newsData.id;
      const newsDataRequest = await fetch(newsUrl);
      const dataJson = await newsDataRequest.json();
      fullNews.push(dataJson);
    }
  }

  return fullNews;
}

async function getFullNewsData() {
  try {
    let urlList = "https://services.radio-canada.ca/neuro/sphere/v1/lineups/4159";
    const fullNews = await fetchAndConcatenateJSON(urlList);

    return fullNews;

  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = getFullNewsData();