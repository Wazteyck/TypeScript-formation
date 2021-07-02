import * as d3 from "d3";
import { ChemicalElt } from "./interfaces/ChemicalElt";

import "./style.scss";

export class Mendeleev {
  constructor() {
    console.log("instantiate Mendeleev");
  }

  async init() {
    const csv: ChemicalElt[] = (await d3.csv(
      "./atomes.csv"
    )) as unknown as ChemicalElt[];
    console.log("csv: ", csv);

    const data = csv.filter((d) => d.Group && d.Period);

    // plug csv into html
    const div = document.querySelector("div.tableau") as Element;

    // Optionnel if 'as Element'
    /*if (!div) {
      throw new Error("div is null");
    }*/
    console.log("div: ", div);

    const selection = d3.select(div).selectAll("div").data(data);
    selection
      .enter()
      .append("div")
      .style("transform", (d) => {
        const x = d.Group * 3;
        const y = d.Period * 3;
        return `translate(${x}em, ${y}em)`;
      })
      .text((d) => d.Symbol + "\n" + d.NumberofNeutrons);
  }
}
