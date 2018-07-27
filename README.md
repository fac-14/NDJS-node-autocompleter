# NDJS-node-autocompleter

By Dominic, Simon, Natalie and Jessie 👨‍👩‍👧‍👦

**Readme contents:**
1. [Try out the app](#Try-out-the-app)
2. [About the Data](#About-the-Data)
3. [About the Build](#About-the-Build)
4. [Getting Donald to talk](#Getting-Donald-to-talk)
5. [Our Strech Goals](#Our-strech-goals)

## From Top Trumps to Trump's Top Tirades

A fun, friendly, and only slightly depressing autocompleting search app that searches all the people and things Trump has insulted on Twitter and returns his quotes. 

![](https://i.imgur.com/E0Phvso.png)


As you will see, this week we took our design and UI to the next level, following the mantra of "subtlety is key". 

## Try out the app

Our app is hosted online here: [Heroku Online App](https://desolate-shore-83992.herokuapp.com/)

Alternatively you can run locally with the following commands from your terminal:

```
git clone https://github.com/fac-14/NDJS-node-autocompleter.git
```
From inside the directory run:
```
npm install
```
Then:
```
npm run dev
```
[<< back to top >>](#NDJS-node-autocompleter)

## About the Data

We found our data on the subreddit [r/datasets](https://www.reddit.com/r/datasets/).

The data was scraped from a [New York Times article](https://www.nytimes.com/interactive/2016/01/28/upshot/donald-trump-twitter-insults.html?mtrref=undefined) titled "The 487 People, Places and Things Donald Trump Has Insulted on Twitter: A Complete List". We implemented a web scraper written by reddit user rarely_beagle to turn the article into JSON.

```
targets = {};
Array.prototype.slice.call(document.getElementsByClassName("g-compliment-links-c")).map(function (e,i) {
  deets = e.children[0].text;
  target = e.children[0].parentNode.parentNode.parentNode.children[0]['id'];
  if (targets[target] == undefined)
    targets[target] = [deets];
  else
    targets[target].push(deets);
})
targets;
JSON.stringify(targets);
```
We've included this as it's neat JavaScript and pretty cool to see a scraper in action! As a general rule though: **don't copy and paste code from strangers on the internet unless you understand it and believe it's safe**. 🚨🚨🚨

[<< back to top >>](#NDJS-node-autocompleter)


## About the build

We structured the project with 4 files in the src folder on the backend:
* server.js
* routes.js
* handlers.js
* test.js

Plus our trusty JSON data in the root of the directory:
* data.json

And 4 files in the public folder on the front end:
* index.html
* script.js
* main.css
* reset.css


### The overall flow is as follows:

Script.js makes a XHR with every keystroke. Server-side magic in handlers.js returns a new JSON object with all the properties in the data.json that match the query string. 

Script.js is in charge of limiting this object to an array of 5 properties, which are rendered as options in an html5 datalist. 

When a user clicks an option or submits the form, another rendering function gathers the quotes for that property and displays them as paragraphs. 

[<< back to top >>](#NDJS-node-autocompleter)


## Getting Donald to talk

Lucily we had our core functionality working halfway through thursday. This meant we could turn our hand to some CSS and strech goals.

Dom had the inspired idea of using SpeechSynthesis to get the browser to read the quotes. A large part of scipt.js is now taken up by the event listener which gets an automated voice to read the quotes, which is a nice touch. 

For more about the experimental SpeechSynthesis Web Speech API, the MDN reference is here:

https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

[<< back to top >>](#NDJS-node-autocompleter)

## Our strech goals

We set some ambitious strech goals and actually achieved some of them!

* Clicking on an autocomplete option should trigger a submit event - _**done!**_ ✅
    * This is not a default feature of datalists and one we had to add. However, since datalists are pretty inert and hard to style/script, this was achieved by checking if the input field text matches one of the options, and firing a submit if it does. 
    * This is not ideal, as it also fires if a user simply types an exact match.
* Text to speech feature - _**done!**_ ✅ More info above.
* Server side input sanitization - _**done!**_ ✅
    * this removes any rougue characters from the queries such as: <,>,/,*,@ ...
    * this is a security feature and way of helping deal with typos.
* Embolden the remaing part of the match that isn't the query - _**not done yet**_ ❌
    * At time of writing we had not replaced datalists with something more stylable, as mosts commercial autocompletes do.
* Use a fuzzysearch/Levenshtein distance npm package to match typos - _**not done yet**_ ❌
    * At time of writing this hasn't been implemented.
    
    
[<< back to top >>](#NDJS-node-autocompleter)    
