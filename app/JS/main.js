import "../CSS/style.css";
//get data
//promises
//show data
import { DOMSelectors } from "./DOMSelectors.js";
let setarray = [];
let dropdown = [];
async function createDropdowns() {
  DOMSelectors.optioncontainer.innerHTML = "";
  DOMSelectors.container.innerHTML = "";
  DOMSelectors.optioncontainer.insertAdjacentHTML(
    "afterbegin",
    `<select class="select select-bordered w-full max-w-xs" id="setdropdown">
      <option value="unselectable" disabled selected>Pick a set</option>
    </select>`
  );
  dropdown = document.querySelector("#setdropdown");
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
    alert("couldnt fetch api stop frickin spamming refresh");
  }
  setarray.forEach((set) => {
    console.log(set.name);
    dropdown.insertAdjacentHTML(
      "beforeend",
      `<option value="${set.name}">${set.name}</option>` //creates all dropdown functions
    );
  });
}
async function createSetData() {
  await createDropdowns();
  const response = await fetch("https://api.pokemontcg.io/v2/sets/");
  const carddata = await response.json();
  dropdown.addEventListener("change", function () {
    const selectedset = dropdown.value; //chosen set
    const selectedcard = carddata.data.filter(
      (findset) => findset.name == selectedset //finds set data
    );
    DOMSelectors.container.innerHTML = "";
    if (
      selectedcard[0].legalities.expanded == "Legal" ||
      selectedcard[0].legalities.expanded == undefined
    ) {
      //for going through cuz some sets are missing the attribute
      DOMSelectors.container.insertAdjacentHTML(
        "afterbegin",
        `<div class="card bg-CardBG w-96 shadow-xl">
        <figure>
          <img
            src="${selectedcard[0].images.logo}"
            alt="setimage" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            ${selectedcard[0].name}
            <div class="badge badge-secondary inline-flex items-center px-2 py-1 min-w-0 truncate">${selectedcard[0].series}</div>
          </h2>
          <p>
            Legality Conditions: <br/>
            Unlimited: ${selectedcard[0].legalities.unlimited} <br/>
            Expanded (if applicable): Legal
          </p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">Release: ${selectedcard[0].releaseDate}</div>
            <div class="badge badge-outline">Card Total: ${selectedcard[0].total}</div>
          </div>
        </div>
      </div>`
      );
    } else {
      DOMSelectors.container.insertAdjacentHTML(
        "afterbegin",
        `<div class="card bg-base-100 w-96 shadow-xl text-TextColor">
        <figure>
          <img
            src="${selectedcard[0].images.logo}"
            alt="setimage" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            ${selectedcard[0].name}
            <div class="badge badge-secondary inline-flex items-center px-2 py-1 min-w-0 truncate">${selectedcard[0].series}</div>
          </h2>
          <p>
            Legality Conditions: <br/>
            Unlimited: ${selectedcard[0].legalities.unlimited} <br/>
            Expanded (if applicable): Illegal
          </p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">Release: ${selectedcard[0].releaseDate}</div>
            <div class="badge badge-outline">Card Total: ${selectedcard[0].total}</div>
          </div>
        </div>
      </div>`
      );
    }
  });
}
async function createRarities() {
  //"tries" code and if it does not achieve a certain output, it returns an error
  let raritycard = []; //card examples picked later
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
        raritycard.push(card);
      });
    }
  } catch (error) {
    alert("couldnt find that card");
  }
  raritycard.forEach((card) =>
    DOMSelectors.container.insertAdjacentHTML(
      "afterbegin",
      `<h1>${card.name}</h1>`
    )
  );
}
document.addEventListener("DOMContentLoaded", () => {
  // Call  when the DOM is fully loaded
  DOMSelectors.maindropdown.addEventListener("change", () => {
    if (DOMSelectors.maindropdown.value == "sets") {
      createSetData(); //if set itll set up for sets
    } else {
      console.log("filler"); //if not itll set up for rarities
    }
  });
});
