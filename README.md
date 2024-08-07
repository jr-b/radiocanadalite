# Radio-Canada Mini

> This project was taken down by a DMCA request from Radio-Canada. It is no longer maintained. The API that was used to fetch the data is also no longer available. The radio-canada.ca frontend is now fetching data from a GraphQL API.
>
> RIP Radio-Canada Mini, 2021-2024.
>
> If you'd like to see what the project looked like, you can still see it on the [Internet Archive Wayback Machine](https://web.archive.org/web/20240209064457/https://radiocanadamini.ca/).

This was an attempt at making a French version of the CBC Lite website: [cbc.ca/lite](https://cbc.ca/lite)

Fetching data from the Radio-Canada API at build time, Eleventy creates pages for every news stories on the main [Radio-Canada.ca](https://ici.radio-canada.ca) sections.

## MVP Roadmap

1. Establish minimal list of lineups to fetch data from ✅
2. Hosted on Github, deployed and served by Vercel ✅
3. Return 10 news stories from the main lineups ✅
4. Minimalist, unintrusive design ✅
5. Trigger build with cron, calling the build hook from Vercel ✅

## To do

- [x] Page template - [one page for each news story](https://www.11ty.dev/docs/pages-from-data/)
- [x] Deploy on Netlify: https://radio-canada-lite.netlify.app
- [x] List main lineups
- [x] Each lineup generate a page
- [x] Build site to refresh the data every 30 min: webhook from Vercel is called every 30 min with cron - [idea is from Dana Byerly](https://danabyerly.com/articles/using-airtable-with-eleventy/#maintenance) - see [this article for details](https://flaviocopes.com/netlify-auto-deploy/)
- [x] Indicate last build time LAST BUILD: {{ buildtime.timestamp | dateToISO }} from [Whimsical](https://github.com/maxboeck/whimsical)
- [x] Dark mode / light more, with auto switch and button
- [x] Ignore longforms and atypical documents that are sometimes included in lineups [https://github.com/mozilla/nunjucks/issues/676](https://github.com/mozilla/nunjucks/issues/676)
- [x] Generate a list of every pages/lineups (sitemap)
- [x] Integrate images that are returned by the endpoints: load only if users click
- [x] /about page to explain project: [rc-lite.xyz/a-propos](https://rc-lite.xyz/a-propos)
- [x] Correctly format dates to human readable [https://11ty.rocks/eleventyjs/dates/](https://11ty.rocks/eleventyjs/dates/)
- [x] Fetch two pages to deliver more articles
