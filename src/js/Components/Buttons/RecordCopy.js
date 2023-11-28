import { recordItem } from "../../utils/RecordRow";
import { addRecord } from "../../utils/Ajax";

class RecordCopy extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.eventCopy();
  }
  eventCopy() {
    this.addEventListener("click", () => {
      const rowCopy = JSON.parse(
        this.closest("tr").getAttribute("data-record"),
      );
      const newCOpy = {
        id: Math.floor(new Date().getTime() / 1000),
        ...rowCopy,
      };
      this.createRow(newCOpy);
    });
  }
  createRow(row) {
    const tbody = this.closest("tbody");
    addRecord(row).then((res) => {
      const record = recordItem(res);
      tbody.appendChild(record);
    });
  }
}

export default RecordCopy;
