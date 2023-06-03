async function fetchAndConcatenateJSON(url) {
  let concatenatedJSON = [];

  let currentPage = 1;
  let lastPage = false;

  // build concatenatedJSON array with the items returned
  const response = await fetch(url);
  const json = await response.json();

  concatenatedJSON.push(...json.items);

  // build list of news id into an array
  let newsIdArray = concatenatedJSON.map((item) => {
    return {
      id: item.referredContent.id,
      //type: item.referredContent.primaryClassificationTag.codeName,
    };
  });

  let fullNews = [];
  // looping over every item, and fetching its full data
  for (const newsData of newsIdArray) {
    if (newsData.id !== null) {
      let newsUrl = `https://services.radio-canada.ca/neuro/v1/news-stories/${newsData.id}`;
      const newsDataRequest = await fetch(newsUrl);
      const dataJson = await newsDataRequest.json();
      fullNews.push(dataJson);
    }
  }

  return fullNews;
}

let urlList = "https://services.radio-canada.ca/neuro/v1/topics/1005685";

module.exports = fetchAndConcatenateJSON(urlList)
  .then((fullNews) => {
    return fullNews;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
