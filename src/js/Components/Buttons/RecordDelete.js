import {remRecord} from "../../utils/Ajax";

class RecordDelete extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback(){
        this.eventDelete();
    }
    eventDelete(){
        this.addEventListener('click', () => {
            const rowCopy = JSON.parse(this.closest('tr').getAttribute('data-record'));
            this.deleteRow(rowCopy.id, this.closest('tr'));
        })
    }
    deleteRow(id, element){
        remRecord(id).then(res => {
            element.remove();
        });
    }
}

export default RecordDelete;