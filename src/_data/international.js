
const fetch = require("node-fetch");

async function fetchAndConcatenateJSON(url) {
  let concatenatedJSON = [];

  let currentPage = 1;
  let lastPage = false;
  let fullNews = [];


  function onlyUnique(value, index, array) {
    return array.findIndex(v => v.id == value.id) === index;
  }

  // call each page available
  // build concatenatedJSON array with the items returned
  while (!lastPage) {
    let tempUrl = url + "?pageNumber=" + currentPage;
    const response = await fetch(tempUrl);
    const json = await response.json();

    if (response.status != 200) {
      console.log("international: got error" + response.status)
      jsonEmpty = { id: "empty" };
      fullNews = JSON.stringify(jsonEmpty);
      return fullNews;
    }

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

  // build list of news id into an array
  let newsIdArray = concatenatedJSON
    .filter(concatenatedJSON => concatenatedJSON.id)
    .map((item) => {
      return {
        id: item.id,
        type: item.contentTypeId,
      };
    });

  let filteredNewsIdArray = [...new Set(newsIdArray)];
  //console.log(filteredNewsIdArray);

  // looping over every item, and fetching its full data
  for (const newsData of filteredNewsIdArray) {
    if (newsData.id !== null && newsData.type == 'NewsStory') {
      let newsUrl = "https://services.radio-canada.ca/neuro/v1/news-stories/" + newsData.id;
      const newsDataRequest = await fetch(newsUrl);
      const dataJson = await newsDataRequest.json();
      fullNews.push(dataJson);
    }
  }

  return fullNews;
}

module.exports = async function () {
  try {
    let urlList = "https://services.radio-canada.ca/neuro/sphere/v1/lineups/96";

    return fetchAndConcatenateJSON(urlList);
  } catch (e) {
    console.error("Error:", e);

  }
}
