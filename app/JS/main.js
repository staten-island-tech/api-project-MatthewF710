import "../CSS/style.css";
//get data
//promises
//show data
import { DOMSelectors } from "./DOMSelectors.js";
let setarray = [];
async function createDropdowns() {
  try {
    //returns a promise
    const response = await fetch("https://api.pokemontcg.io/v2/sets/");
    //guard clause
    if (response.status != 200) {
      throw new Error("Cant find data");
    } else {
      const setdata = await response.json();
      setdata.data.forEach((sets) => {
        setarray.push(sets);
      });
    }
  } catch (error) {
    alert("couldnt find that card");
  }
  setarray.forEach((set) => {
    console.log(set.name);
    DOMSelectors.dropdown.insertAdjacentHTML(
      "beforeend",
      `<option value="${set.name}">${set.name}</option>`
    );
  });
}
async function getData(currentarray) {
  //"tries" code and if it does not achieve a certain output, it returns an error
  let cardarray = []; //all the cards
  try {
    //returns a promise
    const response = await fetch(`https://api.pokemontcg.io/v2/cards`);
    //guard clause
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
  } catch (error) {
    alert("couldnt find that card");
  }
  cardarray.forEach((card) =>
    DOMSelectors.container.insertAdjacentHTML(
      "afterbegin",
      `<h1>${card.name}</h1>`
    )
  );
}
async function creatingCards() {
  const sets = await createDropdowns();
  DOMSelectors.dropdown.addEventListener("change", (selectedset) => {
    const currentset = selectedset.name;
  });
}
// document.addEventListener("");
createDropdowns();
