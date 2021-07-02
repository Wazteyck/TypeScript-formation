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
    console.log("div: ", div);
    div.innerHTML = "";

    const selection = d3.select(div).selectAll("div").data(data);
    selection
      .enter()
      .append("div")
      .text((d) => d.Symbol)
      .on("click", (mouseEvent, d) => {
        console.log("args: ", mouseEvent, d);
        this.updateDetails(d);
      })
      .transition()
      .delay((d) => d.AtomicNumber * 15)
      .styleTween("transform", (d) => {
        const x = d.Group * (3 + 0.5);
        const y = d.Period * (3 + 0.5);

        const startTranslateState = "translate(0,0)";
        const endTranslateState = `translate(${x}em, ${y}em)`;
        return d3.interpolateString(startTranslateState, endTranslateState);
      });
  }

  updateDetails(d: ChemicalElt): void {
    // 1) Get div.details from html
    // 2) Set div.details in span.<class>

    const divDetails = document.querySelector("div.details") as Element;
    console.log("divDetails: ", divDetails);

    (divDetails.querySelector(".symbol") as Element).innerHTML = d.Symbol;
    (divDetails.querySelector(".name") as Element).innerHTML = d.Element;
    (divDetails.querySelector(".atomicNbr") as Element).innerHTML =
      "" + d.AtomicNumber;
    (divDetails.querySelector(".atomicMass") as Element).innerHTML =
      "" + d.AtomicMass;
  }
}
