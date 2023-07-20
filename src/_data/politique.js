const fetch = require("node-fetch");

async function fetchAndConcatenateJSON(url) {
  let concatenatedJSON = [];

  let currentPage = 1;
  let lastPage = false;

  function onlyUnique(value, index, array) {
    return array.findIndex(v => v.id.href == value.id.href) === index;
  }

  // call each page available
  // build concatenatedJSON array with the items returned
  while (!lastPage) {
    let tempUrl = url + "?pagenumber=" + currentPage;
    const response = await fetch(tempUrl);
    const json = await response.json();

    concatenatedJSON.push(...json.contentItemSummaries.items);

    const { contentItemSummaries } = json;
    if (contentItemSummaries.nextPageLink === null) {
      lastPage = true;
    } else {
      currentPage++;
    }
  }

  // build list of news id into an array
  let newsIdArray = concatenatedJSON
    .filter(concatenatedJSON => concatenatedJSON.selfLink)
    .map((item) => {
      return {
        id: item.selfLink,
        type: item.classificationTag.codeName,
      };
    });

  let filteredNewsIdArray = newsIdArray.filter(onlyUnique);


  let fullNews = [];
  // looping over every item, and fetching its full data
  for (const newsData of filteredNewsIdArray) {
    if (newsData.id !== null) {
      let newsUrl = `${newsData.id.href}`;
      const newsDataRequest = await fetch(newsUrl);
      const dataJson = await newsDataRequest.json();
      fullNews.push(dataJson);
    }
  }

  return fullNews;
}

let urlList = "https://services.radio-canada.ca/neuro/v1/lineups/4175";

module.exports = fetchAndConcatenateJSON(urlList)
  .then((fullNews) => {
    return fullNews;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
