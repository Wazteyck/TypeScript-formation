import * as d3 from "d3";

export class Mendeleev {
  constructor() {
    console.log("instantiate Mendeleev");
  }

  async init() {
    const csv = await d3.csv("./atomes.csv");
    console.log("csv: ", csv);
  }
}
