import $ from "jquery";
import "select2";
import { getCities } from "../../utils/Ajax";

class GlobalSelectCity extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    const select = document.createElement("select");
    const defaultOption = {
      label: "Select to all",
    };
    const cities = window.hasOwnProperty("cities")
      ? window.cities
      : await getCities();

    cities.unshift(defaultOption);

    cities &&
      cities.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.label;
        option.innerText = item.label;
        select.appendChild(option);
      });

    this.appendChild(select);
    $(this).find("select").select2();

    $(this)
      .find("select")
      .on("select2:select", (e) => {
        this.changeGlobalState(e.params.data.text);
      });
  }
  changeGlobalState(value) {
    const tbodyRows = document.querySelectorAll(
      "table-records tbody tr.item-record",
    );
    tbodyRows.forEach((tr) => {
      const select = tr.querySelector("select-city select");
      this.changeRowState(tr, value);
      $(select).val(value).trigger("change");
    });
  }
  changeRowState(row, value) {
    const trData = JSON.parse(row.getAttribute("data-record"));
    const tdCityAttr = row.querySelector("td[data-city]");
    tdCityAttr.setAttribute("data-city", value);
    row.setAttribute(
      "data-record",
      JSON.stringify({
        ...trData,
        city: value,
      }),
    );
  }
}

export default GlobalSelectCity;
