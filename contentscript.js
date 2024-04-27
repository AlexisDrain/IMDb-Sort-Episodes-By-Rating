// ==UserScript==
// @name            IMDb Sort Episodes by Rating
// @description     This script adds a button to sort tv show episodes by rating on IMDb 
// @version         1
// @match           *://www.imdb.com/title/tt*
// @grant           none
// ==/UserScript==

// test pages:
// remember to test in different languages! Change language button on top-right of website screen
// regular (malcolm in the middle)
// https://www.imdb.com/title/tt0212671/episodes/?season=4
// page with a score of 10 (breaking bad)
// https://www.imdb.com/title/tt0903747/episodes/?season=5
// page with episodes that have no score. grab more unknown shows from https://www.imdb.com/list/ls528433905/?ref_=fea_eds_hero_wot_sg_hero_2_i&sort=release_date,desc&st_dt=&mode=detail&page=1
// https://www.imdb.com/title/tt26314200/episodes/?ref_=tt_eps_sm





const regex_GetNum = /[-+]?(?:\d*[.,]*\d+)/;
var mainCheckbox;
var sorterDiv;

// document elements
var mainPage = document.querySelector(".ipc-page-grid__item--span-2");
var mainPageTopbarAndEpisodes = mainPage.querySelector(":nth-child(2)");
var topBar = mainPageTopbarAndEpisodes.querySelector(":nth-child(1)"); // aka .sc-56501f3b-0 .iZwhod
var episodesList = mainPageTopbarAndEpisodes.children[1]
/*
Testing document elements

console.log(mainPage)
console.log(mainPageTopbarAndEpisodes)
console.log(topBar)
console.log(episodesList)

// var seasonBar = document.querySelector(".sc-56501f3b-0.iZwhod");
*/

function checkButtonWasNotDeleted() {
  if(document.getElementById("Sort-by-Rating") === null){
    console.log("Button not found: add button");
    addSortButton();
  }
}
function checkMainButtonIsLast() {
  if(topBar.lastChild.id !== "Sort-by-Rating-Div") {
    console.log("resort button was not last: Sort again");
    topBar.appendChild(sorterDiv);
  }
}

function addSortButton() {

  sorterDiv = document.createElement('div');
  sorterDiv.id = "Sort-by-Rating-Div";
  sorterDiv.style.backgroundColor = "#ebebeb";
  sorterDiv.style.borderRadius = "5px";
  sorterDiv.style.overflow = "hidden";
  sorterDiv.style.borderLeft = "4px solid #f5c518";
  sorterDiv.style.padding = "10px";
  sorterDiv.onclick = sortByRating;
  topBar.appendChild(sorterDiv);

  mainCheckbox = document.createElement('input')
  mainCheckbox.type = "checkbox";
  mainCheckbox.innerHTML = 'Sort by Rating'
  mainCheckbox.id = 'Sort-by-Rating'
  mainCheckbox.style.marginLeft = "5px";
  mainCheckbox.onchange = sortByRating;
  sorterDiv.appendChild(mainCheckbox);

  var label = document.createElement("label");
  label.id = 'Sort-by-Rating-Label'
  label.innerText = "Sort by Rating";
  label.style.marginLeft = "10px";
  label.style.fontWeight = "bold";
  label.htmlFor = mainCheckbox.id;
  sorterDiv.appendChild(label);
}

var currentlySortedByRating = false;

function disableSort() {
  currentlySortedByRating = false;
  mainCheckbox.checked = false;
  // make sure this is the last element (appending a child that already exists sorts it)
  topBar.appendChild(sorterDiv);
}

function sortByRating() {
  
  parent = episodesList;
  
  // var sortButton = document.querySelector("#Sort-by-Rating");
  currentlySortedByRating = !currentlySortedByRating; // toggle
  
  mainCheckbox.checked = currentlySortedByRating;

  var i = 1;
  for (var cardChild=parent.firstChild; cardChild!==null; cardChild=cardChild.nextSibling) {

    // some tv episodes dont have enough ratings to get an IMDb rating
    /*
    Old. works only on English
      if(cardChild.querySelector("[aria-label^='IMDb rating: ']")) {
        cardChild.cardAriaLabel = cardChild.querySelector("[aria-label^='IMDb rating: ']").ariaLabel;
        cardChild.cardValue = cardChild.cardAriaLabel.match(regex_GetNum);
      } else {
        cardChild.cardValue = 0.0;
      }
    */
      
    if(cardChild.querySelector("[data-testid='ratingGroup--imdb-rating']")) {
      cardChild.cardAriaLabel = cardChild.querySelector("[data-testid='ratingGroup--imdb-rating']").ariaLabel;
      cardChild.cardAriaLabel = cardChild.cardAriaLabel.replace(",", "."); // for French. They use , instead of .
      cardChild.cardValue = cardChild.cardAriaLabel.match(regex_GetNum);
    } else {
      cardChild.cardValue = 0.0;
    }
    
    if (currentlySortedByRating) {
      // cardChild.cardValue = getDescendantWithClass(cardChild,"ipl-rating-star__rating").textContent;
      cardChild.chronologicalOrder = i;
      i += 1;
    } else { // sort chronologically
      cardChild.cardValue = cardChild.chronologicalOrder;
    }
    
  }
  
  if(currentlySortedByRating) {
    [...parent.children]
    .sort((a,b)=>parseFloat(a.cardValue)<parseFloat(b.cardValue)?1:-1)
    .forEach(node=>parent.appendChild(node));
  } else if(currentlySortedByRating == false) { // sort chronologically
    [...parent.children]
    .sort((a,b)=>parseFloat(a.cardValue)>parseFloat(b.cardValue)?1:-1)
    .forEach(node=>parent.appendChild(node));
  }
}



// we are in a page with a season bar. init extension
if(topBar) {
   // Refresh page when season button is clicked
   const observer = new MutationObserver(refreshPage);
   observer.observe(topBar, { attributes: true, childList: true, subtree: true });
    function refreshPage() {
      if(currentlySortedByRating == true) {
        disableSort();
      }
    }
   
   // Init page
   addSortButton();
   setInterval(checkButtonWasNotDeleted, 2000);
   setInterval(checkMainButtonIsLast, 1000);
}
