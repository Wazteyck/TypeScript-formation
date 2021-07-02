import * as d3 from "d3";
import { Logging } from "./decorators/Logging";
import { ChemicalElt } from "./interfaces/ChemicalElt";

import "./style.scss";

@Logging
export class Mendeleev {
  constructor() {
    console.log("instantiate Mendeleev");
    this.init();
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
      .attr("class", (d) => "na-" + d.AtomicNumber)
      .on("click", (mouseEvent, d) => {
        console.log("args: ", mouseEvent, d);
        this.updateDetails(d);
      })
      // Set element with animation of translation
      .transition()
      .delay((d) => d.AtomicNumber * 5)
      .styleTween("transform", (d) => {
        const x = d.Group * (3 + 0.5);
        const y = d.Period * (3 + 0.5);

        // Set element in the 'perfect place'
        const startTranslateState = "translate(0,0)";
        const endTranslateState = `translate(${x}em, ${y}em)`;
        return d3.interpolateString(startTranslateState, endTranslateState);
      });

    setTimeout(() => {
      this.updateDetails(data[Math.floor(Math.random() * data.length)]);
    }, 500);
  }

  updateDetails(d: ChemicalElt): void {
    // 1) Get div.details from html
    // 2) Set div.details in span.<class>

    const divDetails = document.querySelector("div.details") as Element;
    console.log("divDetails: ", divDetails);

    // Symbol
    (divDetails.querySelector(".symbol") as Element).innerHTML = d.Symbol;
    // Name
    (divDetails.querySelector(".name") as Element).innerHTML = d.Element;
    // Atomic number
    (divDetails.querySelector(".atomicNbr") as Element).innerHTML =
      "" + d.AtomicNumber;
    // Atomic mass
    (divDetails.querySelector(".atomicMass") as Element).innerHTML =
      "" + d.AtomicMass;

    // Remove all element with 'selected' class
    const elementArray = document.querySelectorAll("div.tableau div");
    elementArray.forEach((div) => div.classList.remove("selected"));

    // Add class 'selected' for this.element selected
    const selectedDiv = document.querySelector("div.na-" + d.AtomicNumber);
    selectedDiv?.classList.add("selected");
  }
}
