const filters = require('./utils/filters.js')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addWatchTarget("./src/css/");

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
