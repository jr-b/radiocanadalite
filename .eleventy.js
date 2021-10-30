const filters = require('./utils/filters.js')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/scss/");
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.addPassthroughCopy("./utils/");
  eleventyConfig.addPassthroughCopy({"src/static": "/"});


  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // Filters
    Object.keys(filters).forEach((filterName) => {
      eleventyConfig.addFilter(filterName, filters[filterName])
    })

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
