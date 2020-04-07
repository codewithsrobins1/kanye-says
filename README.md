# Kanye Says

A Kanye West quote generator built using React. To generate more quotes, press the 'Ye Preach' button. Upvotes and downvotes can be given to change Kanye's facial expression.

## Demo

![demo](https://github.com/codewithsrobins1/kanye-says/blob/master/readMeGif.gif?raw=true)

## Link to Live Site

https://kanye-says.netlify.com/

## Built With

* React

## Dependencies

1. Axios (https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
2. UUID (https://github.com/uuidjs/uuid) - Provide unique identifier for each joke

## Getting Started

To get a local copy up and running follow these steps using your terminal.

### Installation

1. Clone the repo
```sh
git clone https://github.com/codewithsrobins1/kanye-says.git
```
2. Install NPM packages
```sh
npm install i

```

## React Components

* App.js - Renders the application
* index. js - default index.js file
* QuoteList.js - Main component that consists of all the quotes and functionality.
* Quote.js - Component that makes the quote render with props passed from the parent QuoteList component. 

## Component Tree

To help visualize the structure of the components, please reference the below structure,

-App.js
  - QuoteList.js
    - Quote.js

