import $ from "jquery";
import "select2";
import { formValidation } from "../utils/RecordValidation";
import { addRecord, updRecords } from "../utils/Ajax";
import { recordItem } from "../utils/RecordRow";
import { agreeModalPrice } from "../utils/ModalToggle";

class FormRecords extends HTMLElement {
  constructor() {
    super();
    window.recordData = {
      id_record: "",
      price: "",
      city: "",
      type: "",
    };
  }
  connectedCallback() {
    this.fieldRecordId();
    this.fieldRecordPrice();
    this.fieldRecordCity();
    this.appendRecord();
    this.saveRecords();
  }

  fieldRecordId() {
    const input = this.querySelector("#record_id");
    input.addEventListener("keyup", (e) => {
      const value = e.currentTarget.value;
      window.recordData = { ...window.recordData, id_record: value };
    });
  }

  fieldRecordPrice() {
    const input = this.querySelector("#record_price");
    input.addEventListener("keyup", (e) => {
      const value = e.currentTarget.value;
      window.recordData = { ...window.recordData, price: value };
    });
  }

  fieldRecordCity() {
    $(this)
      .find("form-select-city select")
      .on("select2:select", (e) => {
        window.recordData = { ...window.recordData, city: e.params.data.text };
      });
  }

  appendRecord() {
    const add_record = this.querySelector("#add_record");
    add_record.addEventListener("click", async () => {
      try {
        const record = window.recordData;
        // Check validation required fields
        formValidation(record);
        await addRecord(record).then((res) => {
          this.renderAppenderRecord(res);
          this.resetForm();
        });
      } catch (e) {
        this.errorAlert(e);
      }
    });
  }

  checkPriceAgree() {
    agreeModalPrice(true);
    return new Promise((res, rej) => {
      document
        .querySelector("#decline-price-agree")
        .addEventListener("click", () => {
          agreeModalPrice(false);
          rej("You decline saved data.");
        });
      document
        .querySelector("#accept-price-agree")
        .addEventListener("click", () => {
          agreeModalPrice(false);
          res(true);
        });
    });
  }

  saveRecords() {
    const save_records = this.querySelector("#save_records");
    save_records.addEventListener("click", async () => {
      const rows = document.querySelectorAll("table-records tr.item-record");
      const checkPrice = document.querySelector(
        "table-records .global-options .price-control input",
      );
      try {
        if (Number(checkPrice.value) > 200000) await this.checkPriceAgree();
        for (const row of rows) {
          const parseData = JSON.parse(row.getAttribute("data-record"));
          // If client send new price for global records
          if (!!checkPrice.value.length && checkPrice.value > 0) {
            await updRecords({
              ...parseData,
              price: checkPrice.value,
            });
          } else {
            await updRecords(parseData);
          }
        }
        // Reload page if client set new Price
        if (!!checkPrice.value.length && checkPrice.value > 0)
          location.reload();
      } catch (e) {
        this.errorAlert(e);
      }
    });
  }

  renderAppenderRecord(recordData) {
    const tbody = document.querySelector("table-records tbody");
    const record = recordItem(recordData);
    tbody.appendChild(record);
  }

  errorAlert(message) {
    const alertError = document.createElement("div");
    alertError.classList.add("alert", "alert-warning");
    alertError.setAttribute("role", "alert");
    alertError.innerText = message;
    this.before(alertError);
    setTimeout(() => alertError.remove(), 2000);
  }
  resetForm() {
    const inputId = this.querySelector("#record_id");
    const inputPrice = this.querySelector("#record_price");
    inputId.value = "";
    inputPrice.value = "";
    Object.defineProperty(window, "recordData", {
      value: {
        id: "",
        price: "",
        city: "",
        type: "",
      },
      writable: true,
      configurable: true,
    });
  }
}

export default FormRecords;
