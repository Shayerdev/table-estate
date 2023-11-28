import AppendAlertError from "../utils/AppendAlertError";
import {ExceptionsGetRecords} from "../utils/Exceptions";
import {getRecords} from "../utils/Ajax";
import {recordsTypeField} from "../utils/RecordTypeField"
import {recordItem} from "../utils/RecordRow";
class TableRecords extends HTMLElement{
    constructor() {
        super();
        this.headLabels = ['Number', 'ID', 'Price', 'City', 'Type', 'Actions']
    }
    connectedCallback(){
        this.getData().then(res => {
            this.createTable();
            this.appendHead();
            this.appendBody(res);
        }).catch(e => {
            new AppendAlertError(this, e);
        });

    }

    createTable(){
        // Reset Inner HTML before append new data
        this.innerHTML = '';
        // Create table Node
        const table = document.createElement('table');
        table.classList.add('table');
        // Append table to TableRecords
        this.appendChild(table);
    }

    appendHead(){
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        this.headLabels.forEach(label => {
            const th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.innerText = label;
            tr.appendChild(th);
        })
        this.querySelector('table').appendChild(thead).appendChild(tr);
    }

    appendGlobalAction(tbodyElement){
        // Main Row
        const trFilter = document.createElement('tr');
        trFilter.classList.add('global-options', 'align-baseline')
        // Cells Global action
        const tdFilterNumber = document.createElement('td');
        tdFilterNumber.innerText = 'ALL'
        const tdFilterID = document.createElement('td');
        const tdFilterPrice = document.createElement('td');
        tdFilterPrice.classList.add('price-control');
        const tdFilterPrice_field = recordsTypeField('price').renderElement();
        tdFilterPrice.appendChild(tdFilterPrice_field);
        const tdFilterCity = document.createElement('td');
        tdFilterCity.appendChild(document.createElement('global-select-city'));
        const tdFilterType = document.createElement('td');
        tdFilterType.appendChild(document.createElement('global-select-type'));

        //Build Global filter items
        [tdFilterNumber, tdFilterID, tdFilterPrice, tdFilterCity, tdFilterType].forEach(item => {
            trFilter.appendChild(item);
        })
        tbodyElement.appendChild(trFilter);
    }

    appendBody(records) {
        const tbody = document.createElement("tbody");
        this.querySelector('table').appendChild(tbody);
        this.appendGlobalAction(tbody);

        records.forEach( row => {
            const record = recordItem(row);
            this.querySelector('tbody').appendChild(record);
        });
    }

    async getData () {
        try {
            const requestRecords = await getRecords();
            if(Object.entries(requestRecords).length === 0)
                throw new ExceptionsGetRecords('Get records return error');

            return requestRecords;
        } catch (e) {
            if(e instanceof ExceptionsGetRecords)
                throw e.message
            throw 'Get data query invalid';
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
}

export default TableRecords;