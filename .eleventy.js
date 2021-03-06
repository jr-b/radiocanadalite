const filters = require('./utils/filters.js')
const { DateTime } = require("luxon");
const HumanReadable = require("human-readable-numbers");
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const slugify = require("slugify");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/scss/");
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.addPassthroughCopy("./utils/");
  eleventyConfig.addPassthroughCopy({"src/static": "/"});
//  eleventyConfig.addPlugin(lazyImagesPlugin);

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("humanReadableNum", function(num) {
		return HumanReadable.toHumanString(num);
	});

  eleventyConfig.addFilter("newsDate", (dateObj, format = "yyyy LLLL dd") => {
		if(typeof dateObj === "string") {
			return DateTime.fromISO(dateObj).toFormat(format);
		} else if(typeof dateObj === "number") {
			dateObj = new Date(dateObj);
		}
		return DateTime.fromJSDate(dateObj).toFormat(format);
	});

  eleventyConfig.addFilter("slugify", function (str) {
    return slugify(str, {
      lower: true,
      replacement: "-",
      remove: /[*+~.·,()'"`´%!?¿:@]/g
    });
  });

  eleventyConfig.addFilter("slug", (str) => {
    if (!str) {
      return;
    }
  
    return slugify(str, {
      lower: true,
      strict: true,
      remove: /["]/g,
    });
  });

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
