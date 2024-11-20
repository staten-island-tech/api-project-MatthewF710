import "../CSS/style.css";
//get data
//promises
//show data
import { DOMSelectors } from "./DOMSelectors.js";
async function getData() {
  //"tries" code and if it does not achieve a certain output, it returns an error
  let cardarray = []; //all the cards
  let page = 1;
  try {
    // for (i = page; page < maxpage#; page++) { FIX THIS LATER im lazy
    //returns a promise
    const response = await fetch("https://api.pokemontcg.io/v2/cards");
    //guard clause
    console.log(response.status);
    console.log("e");
    if (response.status != 200) {
      throw new Error("Cant find data");
    } else {
      //convert promise to json
      const carddata = await response.json();
      //adds cards to main array
      carddata.data.forEach((card) => {
        cardarray.push(card);
      });
    }
    //make smth for checking when cards reach max it breaks
  } catch (error) {
    // }
    alert("couldnt find that card");
  }
  cardarray.forEach((card) =>
    DOMSelectors.container.insertAdjacentHTML(
      "afterbegin",
      `<h1>${card.name}</h1>`
    )
  );
}
getData();
