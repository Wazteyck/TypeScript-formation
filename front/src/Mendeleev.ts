import * as d3 from "d3";

export class Mendeleev {
  constructor() {
    console.log("instantiate Mendeleev");
  }

  async init() {
    const csv = await d3.csv("./atomes.csv");
    console.log("csv: ", csv);

    // plug csv into html
    const div = document.querySelector("div.tableau");

    if (!div) {
      throw new Error("div is null");
    }
    console.log("div: ", div);

    div.innerHTML = "toto";
  }
}
