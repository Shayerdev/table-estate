export const recordsTypeField = (field, defaultValue = "") => {
  switch (field) {
    case "id_record":
      return {
        renderElement: () => {
          const input = document.createElement("input");
          input.classList.add("form-control");
          input.type = "text";
          input.value = defaultValue;
          return input;
        },
        type: "input",
      };
    case "price":
      return {
        renderElement: () => {
          const input = document.createElement("input");
          input.classList.add("form-control");
          input.type = "text";
          input.value = defaultValue;
          return input;
        },
        type: "input",
      };
    case "city":
      return {
        renderElement: () => {
          const select = document.createElement("select-city");
          select.classList.add("select-cities");
          return select;
        },
        type: "select",
      };
    case "type":
      return {
        renderElement: () => {
          const select = document.createElement("select-type");
          select.classList.add("select-type");
          return select;
        },
        type: "select",
      };
    case "action":
      return {
        renderElement: () => {
          // Wrapper button
          const buttonWrap = document.createElement("div");
          buttonWrap.classList.add(
            "actions-button",
            "d-flex",
            "gap-4",
            "align-items-center",
          );
          // Create action buttons
          const buttonCopy = document.createElement("record-copy");
          const buttonDelete = document.createElement("record-delete");
          buttonCopy.innerText = "Copy";
          buttonCopy.classList.add("btn", "btn-primary");
          buttonDelete.innerText = "Delete";
          buttonDelete.classList.add("btn", "btn-danger");
          // Insert button to wrap
          buttonWrap.appendChild(buttonCopy);
          buttonWrap.appendChild(buttonDelete);
          return buttonWrap;
        },
        type: "buttons",
      };
    default:
      return field;
  }
};
