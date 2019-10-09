# MyReads Project

Student: Nicholas Pretorius
Node Version: 10.15.0

## TL;DR

To get started right away:

* `git clone https://github.com/nicholaspretorius/udacity-myreads.git`
* cd udacity-myreads
* Install all project dependencies with `npm install`
* Start the development server with `npm start`
* Run e2e tests with `npm run e2e` (Ctrl + C to quit)

Please note: 

* To run e2e tests, you must *already* have the app running from `npm start`.
* e2e tests run in "chrome" - if you do not have chrome and want to see the tests, run `npm run cy`. This will open Cypress (Ctrl + C to quite). 

### Overview

* This version of 'MyReads' enables the user to add multiple books from the /search page at once (i.e. does not take user back home after every book).
* Books that are in a shelf, are not displayed on the /search results page. 
* Books are stored in localStorage and can be cleared out by clicking on the "X" button on bottom left. 
* If there are not any books in a particular shelf, then the shelf will not be shown. 

