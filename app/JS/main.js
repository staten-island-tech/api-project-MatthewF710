import "../CSS/style.css";
//get data
//promises
//show data
import { DOMSelectors } from "./DOMSelectors.js";
let dropdown = [];
async function pagecounter() {
  //alternate thing I planned but going through all the pages was actually 10 minutes
  let pageNumber = 1;
  while (true) {
    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?page=${pageNumber}`
      );
      const jsonpage = await response.json();
      if (jsonpage.data == "" || undefined) {
        break;
      }
      pageNumber++;
    } catch (error) {
      alert("error fetching");
    }
  }
  return pageNumber;
}
async function createSetDropdowns() {
  let setarray = [];
  DOMSelectors.optioncontainer.innerHTML = "";
  DOMSelectors.container.innerHTML = "";
  DOMSelectors.raritytitlecontainer.innerHTML = "";
  DOMSelectors.optioncontainer.insertAdjacentHTML(
    "afterbegin",
    `<select class="select select-bordered w-full max-w-md bg-purple text-TextColor font-pixelFont" id="setdropdown" sm:w-[70%] md:w-[60%] lg:w-[50%]>
      <option value="unselectable" disabled selected>Pick a set</option>
    </select>`
  );
  DOMSelectors.container.insertAdjacentHTML(
    "afterbegin",
    `<img class="h-[30rem]" src="loading.gif" alt="pokeball spinning loading animation lg:h-[30rem] md:h-[25rem] sm:h-[20rem]">`
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
  DOMSelectors.container.innerHTML = "";
  setarray.forEach((set) => {
    dropdown.insertAdjacentHTML(
      "beforeend",
      `<option value="${set.name}">${set.name}</option>` //creates all dropdown functions
    );
  });
}
async function createRarityDropdowns() {
  let rarityarray = [];
  dropdown = document.querySelector("#setdropdown");
  DOMSelectors.optioncontainer.insertAdjacentHTML(
    "afterbegin",
    `<form id="raritysubmit" class="flex flex-col items-center w-full sm:gap-[.5rem] md:gap-[1rem] lg:gap=[1.5rem]">
      <input type="text" placeholder="Search..." class="py-[1rem] px-[.5rem] rounded mb-0 lg:w=[15%] md:w-[25%] sm:w-[50%] " id="raritysearch">
      <button class="bg-blue text-TextColor font-pixelFont px-[1rem] py-[.5rem] rounded hover:bg-purple mb-[.5rem]" type="submit">Submit</button>
    </form>
    <details class="dropdown relative text-TextColor font-pixelFont sm:w-auto" id="raritydropdown">
      <summary class="btn m-1">Look for Rarities</summary>
      <ul class="menu dropdown-content bg-TopBar rounded-box z-10 w-52 p-2 absolute">
      </ul>
    </details>`
  );
  dropdown = document.querySelector("#raritydropdown");
  try {
    //returns a promise
    const response = await fetch("https://api.pokemontcg.io/v2/rarities");
    //guard clause
    if (response.status != 200) {
      throw new Error("Cant find data");
    } else {
      const raritydata = await response.json();
      raritydata.data.forEach((rarity) => {
        rarityarray.push(rarity);
      });
    }
  } catch (error) {
    alert("couldnt fetch api stop frickin spamming refresh");
  }

  rarityarray.forEach((rarity) => {
    dropdown.insertAdjacentHTML(
      "beforeend",
      `<li class="bg-purple"<a>${rarity}</a></li>` //creates all dropdown functions
    );
  });
}
async function createSetData() {
  await createSetDropdowns();
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
        `<div class="card bg-CardBG w-[75rem] shadow-xl text-TextColor p-3 sm:w-full md:w-[75rem] md:w-[85rem]">
        <figure class="flex justify-center items-center w-full mx-auto sm:w-[70%] md:w-[60%] lg:w-[50%]">
          <img
            src="${selectedcard[0].images.logo}"
            alt="${selectedcard[0].name} Official Set Logo from Pokemon" />
        </figure>
        <div class="card-body">
          <h2 class="card-title sm:text-[1.5rem] md:text-[2rem] lg:text-[2.25rem]">
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
        `<div class="card bg-CardBG w-[75rem] shadow-xl text-TextColor p-3 sm:w-full md:w-[75rem] md:w-[85rem]">
        <figure class="flex justify-center items-center w-full mx-auto sm:w-[70%] md:w-[60%] lg:w-[50%]">
          <img
            src="${selectedcard[0].images.logo}"
            alt="setimage" />
        </figure>
        <div class="card-body">
          <h2 class="card-title sm:text-[1.5rem] md:text-[2rem] lg:text-[2.25rem]">
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
  DOMSelectors.optioncontainer.innerHTML = "";
  DOMSelectors.container.innerHTML = "";
  DOMSelectors.raritytitlecontainer.innerHTML = "";
  await createRarityDropdowns();
  try {
    //returns a promise
    const raritiesResponse = await fetch(
      "https://api.pokemontcg.io/v2/rarities"
    );
    const raritylist = [];
    //guard clause
    if (raritiesResponse.status != 200) {
      throw new Error("Cant find rarity data: please retry");
    } else {
      const rarities = await raritiesResponse.json();
      //convert promise to json
      rarities.data.forEach((rarity) => {
        raritylist.push(rarity);
      });
      let submit = document.querySelector("#raritysubmit");
      let inputrarity = document.querySelector("#raritysearch");
      let currentrarity = null;
      submit.addEventListener("submit", async (event) => {
        DOMSelectors.container.innerHTML = "";
        DOMSelectors.raritytitlecontainer.innerHTML = "";
        event.preventDefault();
        DOMSelectors.container.insertAdjacentHTML(
          "afterbegin",
          `<img class="h-[30rem]" src="loading.gif" alt="pokeball spinning loading animation">`
        );
        raritylist.forEach((rarity) => {
          if (rarity == inputrarity.value) {
            currentrarity = rarity;
          }
        });
        if (currentrarity !== null) {
          const response = await fetch("https://api.pokemontcg.io/v2/cards");
          const cardcountdata = await response.json();
          let totalpages = Math.round(cardcountdata.totalCount / 250); //takes much less loading but relies on updated api
          let currentpage = Math.random() * totalpages + 1;
          const newresponse = await fetch(
            `https://api.pokemontcg.io/v2/cards?page=${currentpage}`
          );
          const realcarddata = await newresponse.json();
          realcarddata.data.forEach((card) => {
            const rarityCheck = card?.rarity || card?.data?.rarity;
            if (currentrarity === rarityCheck) {
              //looked ? thingy up, basically, checks if they exist
              raritycard.push(card); //adds cards to main array
            }
          });
          DOMSelectors.container.innerHTML = "";
          DOMSelectors.raritytitlecontainer.insertAdjacentHTML(
            "afterbegin",
            `<h1 class="font-pixelFont text-3xl text-TextColor sm:text-xl">Searching a random page for...:  ${currentrarity}</h1>`
          );
          raritycard.forEach((card) =>
            DOMSelectors.container.insertAdjacentHTML(
              "afterbegin",
              `<div class="w-[15%] h-auto bg-CardBG border border-TextColor rounded-lg shadow-md overflow-hidden md:w-[15%]sm:w-[30%]">
                <img
                src="${card.images?.small}"
                alt="${card.name} card art"
                class="w-full h-48 object-contain sm:h-40"
                />
                <div class="p-4">
                  <h2 class="text-[2rem] font-pokeFont text-TextColor mb-2 tracking-widest lg:text-[2.5rem] md:text-[2rem] sm:text-[1.5rem]">${
                    card.name
                  }</h2>
                  <div class="text-[1.5rem] font-pixelFont text-TextColor mb-1 sm:text-[1rem]">Types: ${
                    card.types || "N/A"
                  }</div>
                  <div class="card-actions justify-end">
                    <div class="badge text-[.5rem] font-pixelFont text-TextColor mb-1 bg-green">HP: ${
                      card.hp || "N/A"
                    }</div>
                    <kbd class="kbd text-[.5rem] font-pixelFont text-TextColor mb-1 bg-modernBg">Subtypes: ${
                      card.subtypes || "N/A"
                    }</kbd>
                  </div>
                </div>
              </div>`
            )
          );
        } else {
          DOMSelectors.container.innerHTML = "";
          alert(
            "Not an actual rarity; please check the dropdowns and enter a valid response."
          );
          return;
        }
      });
    }
  } catch (error) {
    alert("something went wrong in fetching the api, please try again");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  // Call  when the DOM is fully loaded
  DOMSelectors.maindropdown.addEventListener("change", () => {
    if (DOMSelectors.maindropdown.value == "sets") {
      createSetData(); //if set itll set up for sets
    } else {
      createRarities(); //if not itll set up for rarities
    }
  });
});
