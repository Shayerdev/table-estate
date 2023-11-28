import "bootstrap";
import TableRecords from "./Components/TableRecords";
import TableErrorAlert from "./Components/TableErrorAlert";
import RecordDelete from "./Components/Buttons/RecordDelete";
import RecordCopy from "./Components/Buttons/RecordCopy";
import { getCities, getTypes } from "./utils/Ajax";
import RecordSelectCity from "./Components/Select/RecordSelectCity";
import RecordSelectType from "./Components/Select/RecordSelectType";
import GlobalSelectCity from "./Components/Select/GlobalSelectCity";
import GlobalSelectType from "./Components/Select/GlobalSelectType";
import FormRecords from "./Components/FormRecords";
import FormSelectCity from "./Components/Select/FormSelectCity";
import FormSelectType from "./Components/Select/FormSelectType";

/* Load Option for select */
(async () => (window.cities = await getCities()))();
(async () => (window.types = await getTypes()))();

/* Define Components */
customElements.define("form-record", FormRecords);
customElements.define("table-records", TableRecords);
customElements.define("table-error-alert", TableErrorAlert);
customElements.define("record-delete", RecordDelete);
customElements.define("record-copy", RecordCopy);
customElements.define("select-city", RecordSelectCity);
customElements.define("select-type", RecordSelectType);
customElements.define("form-select-city", FormSelectCity);
customElements.define("form-select-type", FormSelectType);
customElements.define("global-select-city", GlobalSelectCity);
customElements.define("global-select-type", GlobalSelectType);
