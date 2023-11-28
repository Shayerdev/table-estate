class TableErrorAlert extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = this.getAttribute("message");
  }
}

export default TableErrorAlert;
