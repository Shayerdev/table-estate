import { recordsTypeField } from "./RecordTypeField";

export const recordItem = (dataRecord, type = "old") => {
  const tr = document.createElement("tr");
  tr.classList.add("align-baseline", "item-record");
  tr.setAttribute("data-record", JSON.stringify(dataRecord));
  Object.keys(Object.assign(dataRecord, { action: "true" })).forEach((item) => {
    const td = document.createElement("td");
    td.setAttribute(`data-${item}`, dataRecord[item]);
    const checkField = recordsTypeField(item, dataRecord[item]);
    checkField.hasOwnProperty("renderElement")
      ? td.appendChild(checkField.renderElement())
      : (td.innerText = dataRecord[item]);
    tr.appendChild(td);
  });
  return tr;
};
