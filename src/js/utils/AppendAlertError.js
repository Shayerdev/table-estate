class AppendAlertError {
  constructor(to, message) {
    this.to = to;
    this.message = message;
    this.insert();
  }

  insert() {
    this.to.innerHTML = "";
    const errorAlert = document.createElement("table-error-alert");
    errorAlert.classList.add(
      "alert",
      "alert-danger",
      "d-block",
      "mb-3",
      "mt-3",
    );
    errorAlert.setAttribute("role", "alert");
    errorAlert.setAttribute("message", this.message);
    this.to.appendChild(errorAlert);
  }
}

export default AppendAlertError;
