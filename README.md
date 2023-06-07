# Project Overview

This application is a replica of the home page of https://www.thecocktaildb.com/. It is a relatively small application that focuses on replicating the functionality of the original website.

To manage the state within the application, I have utilized the useState hooks provided by React. These hooks offer a convenient and suitable mechanism to implement the expected functionality.

In order to fetch cocktail items from the server, I have made use of the "/random" API endpoint. Since this endpoint only provides one item at a time, I needed to make five separate API calls to fulfill the requirement of displaying five random cocktails.

Whenever the page is refreshed or the search query is cleared, the application will automatically send a request to fetch five new random cocktail items.

Search Functionality:

- When a user types in the search box, the application displays the search results based on the query. If no results are available, a message stating "No data available" is shown.
- Additionally, I have included the option to add a cocktail item to the user's favorites list for better usability. This option is available for each cocktail item in the search results.

Adding to Favorites:

- Users can add items to their favorites list by clicking on the heart icon (considered as the "add to favorites" button). To provide a better user experience, I have added a tooltip next to the icon to guide users on how to interact with it.
  To store the list of favorite items, I have used a static array. This array retains its values throughout the initial rendering of the application. However, if the page is refreshed, the data will be lost, and the array will return to an empty state.

Lastly, it's worth mentioning that this application is responsive and has been designed to work well on both mobile and desktop devices.

## Table of Contents

- [Installation](#installation)
- [Test](#usage)
- [Assumption](#features)

## Installation

---

A little intro about the installation.

```
$ git clone
$ cd amused-cocktail-app-challenge
$ npm install
$ npm start
```

## Test

---

A little intro about the run test suite.

```
$ npm test
```

## Assumption

```
$ The application consists solely of a home page, without any additional pages or sections.
$ Users are only required to monitor their favorite items while using the app. There are no other specific tasks or functionalities.
$ Authentication is not necessary to view cocktail details or access any other features of the application. All content is freely accessible without any authentication requirements.
```
