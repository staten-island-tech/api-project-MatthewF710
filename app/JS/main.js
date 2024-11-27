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
async function createSetData() {
  await createDropdowns();
  const response = await fetch("https://api.pokemontcg.io/v2/sets/");
  const carddata = await response.json();
  DOMSelectors.dropdown.addEventListener("change", function () {
    const selectedset = DOMSelectors.dropdown.value;
    const selectedcard = carddata.data.filter(
      (findset) => findset.name == selectedset
    );
    DOMSelectors.container.innerHTML = "";
    DOMSelectors.container.insertAdjacentHTML(
      "afterbegin",
      `<div class="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src="${selectedcard[0].images.logo}"
          alt="setimage" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          ${selectedcard[0].name}
          <div class="badge badge-secondary">${selectedcard[0].series}</div>
        </h2>
        <p>
          Legality Conditions: <br/>
          Unlimited: ${selectedcard[0].legalities.unlimited} <br/>
          Expanded: ${selectedcard[0].legalities.expanded}
        </p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">Release: ${selectedcard[0].releasedate}</div>
          <div class="badge badge-outline">Card Total: ${selectedcard[0].total}</div>
        </div>
      </div>
    </div>`
    );
  });
}
createDropdowns();
createSetData();
