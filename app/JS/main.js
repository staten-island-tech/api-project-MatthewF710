import "../CSS/style.css";
//get data
//promises
//show data
import "";
async function getData() {
  //"tries" code and if it does not achieve a certain output, it returns an error
  try {
    //returns a promise
    const response = await fetch("");
    //guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      //convert promise to json
      const data = await response.json();
      console.log(data.data);
      //this is UNIQUE to THIS API
      data.data.array.forEach((agent) =>
        document
          .querySelector("div")
          .insertAdjacentHTML("afterbegin", `<h1>${agent.displayName}</h1>`)
      );
    }
  } catch (error) {
    alert("couldnt find that agent");
  }
}
getData();
