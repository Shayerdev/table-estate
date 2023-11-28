import $ from "jquery";
import 'select2';
import {getTypes} from "../../utils/Ajax";

class FormSelectType extends HTMLElement {
    constructor() {
        super();
    }
    async connectedCallback(){
        const select = document.createElement('select');
        const types = window.hasOwnProperty('types')
            ? window.types
            : await getTypes();

        types && types.forEach(item => {
            const option = document.createElement('option');
            option.value = item.label;
            option.innerText = item.label;
            select.appendChild(option);
        })

        this.appendChild(select);
        $(this).find('select').select2();

        $(this).on('select2:select',  (e) => {
            window.recordData = { ...window.recordData, type: e.params.data.text }
        });
    }
}

export default FormSelectType