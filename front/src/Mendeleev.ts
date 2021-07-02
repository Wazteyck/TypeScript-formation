import * as d3 from "d3";

import "./style.scss";

export class Mendeleev {
  constructor() {
    console.log("instantiate Mendeleev");
  }

  async init() {
    const csv = await d3.csv("./atomes.csv");
    console.log("csv: ", csv);

    // plug csv into html
    const div = document.querySelector("div.tableau") as Element;

    // Optionnel if 'as Element'
    /*if (!div) {
      throw new Error("div is null");
    }*/
    console.log("div: ", div);

    const selection = d3.select(div).selectAll("div").data(csv);
    selection
      .enter()
      .append("div")
      .style("transform", (d) => {
        const x = (d as any).Group * 3;
        const y = (d as any).Period * 3;
        return `translate(${x}em, ${y}em)`;
      })
      .text((d) => (d as any).Symbol);
  }
}
