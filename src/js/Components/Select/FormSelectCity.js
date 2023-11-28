import $ from "jquery";
import "select2";
import { getCities } from "../../utils/Ajax";

class FormSelectCity extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    const select = document.createElement("select");
    const cities = window.hasOwnProperty("cities")
      ? window.cities
      : await getCities();

    cities &&
      cities.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.label;
        option.innerText = item.label;
        select.appendChild(option);
      });

    this.appendChild(select);
    $(this).find("select").select2();

    $(this).on("select2:select", (e) => {
      window.recordData = { ...window.recordData, city: e.params.data.text };
    });
  }
}

export default FormSelectCity;
