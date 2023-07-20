


const fetch = require("node-fetch");

async function fetchAndConcatenateJSON(url) {
  let concatenatedJSON = [];

  let currentPage = 1;
  let lastPage = false;

  function onlyUnique(value, index, array) {
    return array.findIndex(v => v.id == value.id) === index;
  }

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

  let newsIdArray = concatenatedJSON
    .filter(concatenatedJSON => concatenatedJSON.id)
    .map((item) => {
      return {
        id: item.id,
        type: item.contentTypeId,
      };
    });

  let filteredNewsIdArray = newsIdArray.filter(onlyUnique);

  let fullNews = [];
  for (const newsData of filteredNewsIdArray) {
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