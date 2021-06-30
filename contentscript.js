// ==UserScript==
// @name            IMDb Sort Episodes by Rating
// @description     This script adds a button to sort tv show episodes by rating on IMDb 
// @version         1
// @match           *://www.imdb.com/title/tt*
// @grant           none
// ==/UserScript==


function checkButtonWasNotDeleted() {
  if(!document.getElementById("Sort by Rating")){
    addButton('Sort by Rating', sortByRating)
  }
}

function addButton(text, onclick, cssObj) {
    cssObj = cssObj || {"float":"right", "margin-right":"1em", "font-size": "0.50em", 'z-index': 3}
    let button = document.createElement('button'), btnStyle = button.style
    document.getElementById("episode_top").appendChild(button)
    button.innerHTML = text
    button.id = text
    button.onclick = onclick
    Object.keys(cssObj).forEach(key => btnStyle[key] = cssObj[key])
    return button
}



function sortByRating() {
  buttonText = document.getElementById("Sort by Rating").innerHTML;
  if(buttonText == "Sort by Rating") {
    document.getElementById("Sort by Rating").innerHTML = "Sort Chronologically";
  } else {
    document.getElementById("Sort by Rating").innerHTML = "Sort by Rating";
  }

  parent = document.getElementsByClassName('list detail eplist')[0]

  var i = 1;
  for(var cardChild=parent.firstChild; cardChild!==null; cardChild=cardChild.nextSibling) {
    if(!cardChild.className){
      continue;
    }

    if(buttonText == "Sort by Rating") {
      cardChild.cardValue = getDescendantWithClass(cardChild,"ipl-rating-star__rating").textContent;
      cardChild.chronologicalOrder = i;
      i += 1;
    } else { // sort chronologically
      cardChild.cardValue = cardChild.chronologicalOrder;
    }

  }
  
  if(buttonText == "Sort by Rating") {
    [...parent.children]
    .sort((a,b)=>a.cardValue<b.cardValue?1:-1)
    .forEach(node=>parent.appendChild(node));
  } else { // sort chronologically
    [...parent.children]
    .sort((a,b)=>a.cardValue>b.cardValue?1:-1)
    .forEach(node=>parent.appendChild(node));
  }
}

function getDescendantWithClass(element, clName) {
    var children = element.childNodes;
    for (var i = 0; i < children.length; i++) {
        if (children[i].className &&
            children[i].className.split(' ').indexOf(clName) >= 0) {
            return children[i];
          }
      }
      for (var i = 0; i < children.length; i++) {
          var match = getDescendantWithClass(children[i], clName);
          if (match !== null) {
              return match;
          }
      }
      return null;
}

addButton('Sort by Rating', sortByRating)
setInterval(checkButtonWasNotDeleted, 2000);