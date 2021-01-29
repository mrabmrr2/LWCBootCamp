import { LightningElement, wire, track, api } from 'lwc';
import getBookList from '@salesforce/apex/BookController.getBookList';

import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class BookLibrary extends LightningElement {
    @track searchKey = "";
    @track books;
    error;
    @track bookSize;
    @track strId;

    @wire(MessageContext) messageContext;

    handleChange(event){
        this.searchKey = event.target.value;
    }

    handleClick(event){
        this.strId = event.currentTarget.dataset.id;
        const message = { 
            lmsData:{
                recordId: this.strId
            }
        };
        publish(this.messageContext, SAMPLEMC, message);
    }

    @wire(getBookList, {searchKey:'$searchKey'})
    wiredBooks({ error, data }) {
        if (data) {
            this.books = data;
            this.error = undefined;
            this.bookSize = this.books.length;
            console.log(this.books);
        }
        else if (error) {
            this.error = error;
            this.books = undefined;
            console.log(this.error);
        }
    }

    
}