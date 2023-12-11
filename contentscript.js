// ==UserScript==
// @name            IMDb Sort Episodes by Rating
// @description     This script adds a button to sort tv show episodes by rating on IMDb 
// @version         1
// @match           *://www.imdb.com/title/tt*
// @grant           none
// ==/UserScript==

const regex_GetNum = /\d+\.\d+/;
var mainCheckbox;

function checkButtonWasNotDeleted() {
  if(document.getElementById("Sort-by-Rating") === null){
    console.log("Button not found: add button");
    addSortButton();
  }
}

function addSortButton() {

  var div = document.createElement('div');
  div.id = "Sort-by-Rating-Div";
  div.style.backgroundColor = "#ebebeb";
  div.style.borderRadius = "5px";
  div.style.overflow = "hidden";
  document.querySelector(".sc-58f3e8aa-0.cLMIyf").prepend(div)

  var smallYellow = document.createElement("span");
  smallYellow.role = "presentation";
  smallYellow.style.backgroundColor = "#f5c518";
  smallYellow.style.display = "inline-block";
  smallYellow.style.width = "4px";
  smallYellow.style.height = "100px";
  div.appendChild(smallYellow);

  mainCheckbox = document.createElement('input')
  mainCheckbox.type = "checkbox";
  mainCheckbox.innerHTML = 'Sort by Rating'
  mainCheckbox.id = 'Sort-by-Rating'
  mainCheckbox.onchange = sortByRating;
  div.appendChild(mainCheckbox);

  var label = document.createElement("label");
  label.id = 'Sort-by-Rating-Label'
  label.innerText = " Sort by Rating";
  label.htmlFor = mainCheckbox.id;
  div.appendChild(label);
}

var currentlySortedByRating = false;

function sortByRating() {
  
  parent = document.querySelector(".sc-58f3e8aa-0.cLMIyf");
  
  var sortButton = document.querySelector("#Sort-by-Rating");
  currentlySortedByRating = !currentlySortedByRating; // toggle
  
  mainCheckbox.checked = currentlySortedByRating;

  var i = 1;
  for (var cardChild=parent.firstChild; cardChild!==null; cardChild=cardChild.nextSibling) {
    
    if (cardChild.id == "Sort-by-Rating-Div") {
      continue;
    }
    
    cardChild.cardAriaLabel = cardChild.querySelector("[aria-label^='IMDb rating: ']").ariaLabel;
    cardChild.cardValue = cardChild.cardAriaLabel.match(regex_GetNum);
    
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
    .sort((a,b)=>a.cardValue<b.cardValue?1:-1)
    .forEach(node=>parent.appendChild(node));
  } else if(currentlySortedByRating == false) { // sort chronologically
    [...parent.children]
    .sort((a,b)=>a.cardValue>b.cardValue?1:-1)
    .forEach(node=>parent.appendChild(node));
  }
}

// Refresh page when season button is clicked
 var seasonBar = document.querySelector(".sc-bb8e8454-0.hshVlp");
const observer = new MutationObserver(refreshPage);
observer.observe(seasonBar, { attributes: true, childList: true, subtree: true });

 function refreshPage() {
   if(currentlySortedByRating == true) {
     sortByRating();
   }
 }
 
 // Init page
 addSortButton();
 setInterval(checkButtonWasNotDeleted, 2000);