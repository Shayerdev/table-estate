import $ from "jquery";
import 'select2';
import {getTypes} from "../../utils/Ajax";

class GlobalSelectType extends HTMLElement {
    constructor() {
        super();
    }
    async connectedCallback(){
        const select = document.createElement('select');
        const defaultOption = {
            label: 'Select to all'
        }
        const types = window.hasOwnProperty('types')
            ? window.types
            : await getTypes();

        types.unshift(defaultOption);

        types && types.forEach(item => {
            const option = document.createElement('option');
            option.value = item.label;
            option.innerText = item.label;
            select.appendChild(option);
        })

        this.appendChild(select);
        $(this).find('select').select2();

        $(this).find('select').on('select2:select',  (e) => {
            this.changeGlobalState(e.params.data.text);
        });
    }
    changeGlobalState(value){
        const tbodyRows = document.querySelectorAll('table-records tbody tr.item-record');
        tbodyRows.forEach(tr => {
            const select = tr.querySelector('.select-type select');
            this.changeRowState(tr, value);
            $(select).val(value).trigger('change');
            // $(select).append({
            //     id: value,
            //     text: value
            // }).trigger('change');
        })
    }
    changeRowState(row, value){
        const trData = JSON.parse(row.getAttribute('data-record'));
        const tdTypeAttr = row.querySelector('td[data-type]');
        tdTypeAttr.setAttribute('data-type', value);
        row.setAttribute('data-record', JSON.stringify({
            ...trData,
            type: value
        }));
    }
}

export default GlobalSelectType