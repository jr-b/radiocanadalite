
# Radio-Canada Lite

> 🚧 Work in progress 🚧

This is an attempt at making a French version of the CBC Lite website: [cbc.ca/lite](https://cbc.ca/lite)

Fetching data from the Radio-Canada API at build time, Eleventy creates pages for every news stories on the main [Radio-Canada.ca](https://ici.radio-canada.ca) sections.

## MVP Roadmap
1. Establish minimal list of lineups to fetch data from ✅
2. Hosted on Github, served by Vercel ✅
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
- [x] Dark mode
- [x] Ignore longforms and atypical documents that are sometimes included in lineups [https://github.com/mozilla/nunjucks/issues/676](https://github.com/mozilla/nunjucks/issues/676)
- [x] Generate a list of every pages/lineups (sitemap)
- [x] Integrate images that are returned by the endpoints: load only if users click
    - [ ] Correct/debug Javascript that glitches when clicking to load images
- [x] /about page to explain project: [rc-lite.xyz/a-propos](https://rc-lite.xyz/a-propos)
- [x] Correctly format dates to human readable [https://11ty.rocks/eleventyjs/dates/](https://11ty.rocks/eleventyjs/dates/)
    - [ ] Change to canadian timezone (actually return time in GMT)
- [ ] Regions list: select element from list (html select element)
- [ ] Attachments: `{% if articles.address.body.attachments[0].htmlSnippet.html %}<hr>{{ articles.address.body.attachments[0].htmlSnippet.html | safe }}{% endif %}`

