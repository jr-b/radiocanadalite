
# Radio-Canada Lite

> 🚧 This is a work in progress 🚧

This is an attempt at making a French version of the CBC Lite website: [cbc.ca/lite](cbc.ca/lite)

Fetching data from the Radio-Canada API at build time, Eleventy creates pages for every news stories on the main [Radio-Canada.ca](radio-canada.ca) sections.

## MVP Roadmap
1. Establish minimal list of lineups to fetch data from;
2. Hosted on Github, served by Netlify free tier;
3. Return 10 news stories from the main lineups;
4. Reuse the design from cbc.ca/lite
5. Trigger build with Netlify webhook + Zapier every X hour

## To do
- [x] Page template - [one page for each news story](https://www.11ty.dev/docs/pages-from-data/)
- [x] Deploy on Netlify: https://radio-canada-lite.netlify.app
- [ ] Base template - based on cbc.ca/lite
- [ ] List main lineups
- [ ] Each lineup generate a page
- [ ] Generate a list of every pages/lineups (sitemap)
- [ ] Netlify: setup recurrent build each 4h(?) with Zapier - [idea is from Dana Byerly](https://danabyerly.com/articles/using-airtable-with-eleventy/#maintenance) - see [this article for details](https://flaviocopes.com/netlify-auto-deploy/)