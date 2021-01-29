import { LightningElement, wire, track, api } from 'lwc';
import getGoogleBooks from '@salesforce/apex/BookController.getGoogleBooks';

export default class GoogleBook extends LightningElement {
    @track searchKey = "";

    handleClick(event){
        this.searchKey = this.template.querySelector('lightning-input').value;
    }

    @wire(getGoogleBooks, { searchKey: '$searchKey' }) googleBooks;

}