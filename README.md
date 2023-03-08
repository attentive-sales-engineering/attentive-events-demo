# attentive-events-demo
This is a branded sports events demo environment integrated with the Attentive SMS platform. 

Click the link below to view the website:

- [Attentive Events Demo](https://attentive-sales-engineering.github.io/attentive-events-demo/)

To experience the demo via SMS:

- Text `DEMO` to +1-833-461-3286

# How it works

- Static HTML site
- Attentive Tag embeded on each page to track events and present Sign-Up Unit to new visitors to captture email and sms subscribers
  - `<script src="//cdn.attn.tv/attentiveairlinedemo/dtag.js"></script>`
- `js/attentive-sdk.js` captures and stores user input (e.g. dates and locations) in local storage and triggers Attentive SDK events when user performs various actions
  - `postMessage()` - captures data (email, phone) from the Sign-Up Unit iframe
  - `window.attentive.analytics.productView` - captures product view events
  - `window.attentive.analytics.addToCart` - captures add to cart events
  - `window.attentive.analytics.purchase` - captures purchase events
- Attentive captures the subscriber data from the Sign-Up Unit, and events from the SDK, and triggers SMS Journeys
