import $ from "jquery";
import 'select2';
import {getCities} from "../../utils/Ajax";

class RecordSelectCity extends HTMLElement {
    constructor() {
        super();
    }
    async connectedCallback(){
        const select = document.createElement('select');
        const currentSelected = this.closest('td').getAttribute('data-city') || '';
        const cities = window.hasOwnProperty('cities')
            ? window.cities
            : await getCities();

        cities && cities.forEach(item => {
            const option = document.createElement('option');
            option.value = item.label;
            option.innerText = item.label;
            if(item.label.trim() === currentSelected.trim())
                option.setAttribute('selected', true);
            select.appendChild(option);
        })

        this.appendChild(select);
        $(this).find('select').select2();

        $(this).find('select').on('select2:select',  (e) => {
            this.changeState(e.params.data.text);
        });
    }
    changeState(value){
        const parentRow = this.closest('tr');
        const oldData = JSON.parse(parentRow.getAttribute('data-record'));

        // Change td info
        this.closest('td').setAttribute('data-city', value);
        // Change global row
        parentRow.setAttribute('data-record', JSON.stringify({
            ...oldData,
            city: value
        }));
    }
}

export default RecordSelectCity