// ==UserScript==
// @name            IMDb Sort Episodes by Rating
// @description     This script adds a button to sort tv show episodes by rating on IMDb 
// @version         1
// @match           *://www.imdb.com/title/tt*
// @grant           none
// ==/UserScript==

const regex_GetNum = /[-+]?(?:\d*\.*\d+)/;
var mainCheckbox;
var mainDiv;

function checkButtonWasNotDeleted() {
  if(document.getElementById("Sort-by-Rating") === null){
    console.log("Button not found: add button");
    addSortButton();
  }
}
function checkMainButtonIsLast() {
  if(document.querySelector(".sc-56501f3b-0.iZwhod").lastChild.id !== "Sort-by-Rating-Div") {
    console.log("resort button was not last: Sort again");
    document.querySelector(".sc-56501f3b-0.iZwhod").appendChild(mainDiv);
  }
}

function addSortButton() {

  mainDiv = document.createElement('div');
  mainDiv.id = "Sort-by-Rating-Div";
  mainDiv.style.backgroundColor = "#ebebeb";
  mainDiv.style.borderRadius = "5px";
  mainDiv.style.overflow = "hidden";
  mainDiv.style.borderLeft = "4px solid #f5c518";
  mainDiv.style.padding = "10px";
  mainDiv.onclick = sortByRating;
  document.querySelector(".sc-56501f3b-0.iZwhod").appendChild(mainDiv);

  mainCheckbox = document.createElement('input')
  mainCheckbox.type = "checkbox";
  mainCheckbox.innerHTML = 'Sort by Rating'
  mainCheckbox.id = 'Sort-by-Rating'
  mainCheckbox.style.marginLeft = "5px";
  mainCheckbox.onchange = sortByRating;
  mainDiv.appendChild(mainCheckbox);

  var label = document.createElement("label");
  label.id = 'Sort-by-Rating-Label'
  label.innerText = "Sort by Rating";
  label.style.marginLeft = "10px";
  label.style.fontWeight = "bold";
  label.htmlFor = mainCheckbox.id;
  mainDiv.appendChild(label);
}

var currentlySortedByRating = false;

function disableSort() {
  currentlySortedByRating = false;
  mainCheckbox.checked = false;
   // make sure this is the last element (appending a child that already exists sorts it)
  document.querySelector(".sc-56501f3b-0.iZwhod").appendChild(mainDiv);
}

function sortByRating() {
  
  parent = document.querySelector(".sc-7b9ed960-0.jNjsLo");
  
  // var sortButton = document.querySelector("#Sort-by-Rating");
  currentlySortedByRating = !currentlySortedByRating; // toggle
  
  mainCheckbox.checked = currentlySortedByRating;

  var i = 1;
  for (var cardChild=parent.firstChild; cardChild!==null; cardChild=cardChild.nextSibling) {

    // some tv episodes dont have enough ratings to get an IMDb rating
    if(cardChild.querySelector("[aria-label^='IMDb rating: ']")) {
      cardChild.cardAriaLabel = cardChild.querySelector("[aria-label^='IMDb rating: ']").ariaLabel;
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
var seasonBar = document.querySelector(".sc-56501f3b-0.iZwhod");
if(seasonBar) {
   // Refresh page when season button is clicked
   const observer = new MutationObserver(refreshPage);
   observer.observe(seasonBar, { attributes: true, childList: true, subtree: true });
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
