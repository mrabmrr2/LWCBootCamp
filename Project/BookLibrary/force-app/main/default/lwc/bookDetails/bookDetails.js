import { LightningElement, wire, track, api } from 'lwc';
import getBooks from '@salesforce/apex/BookDetailController.getBooks';

import {subscribe,unsubscribe,APPLICATION_SCOPE,MessageContext} from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';

import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class BookDetails extends NavigationMixin(LightningElement) {
    @wire(MessageContext) messageContext;
    subscription = null;
    receivedMessage;
    @track strId;

    books;
    error;

    subscribeMC(){
        
            this.subscription = subscribe(
                this.messageContext,
                SAMPLEMC,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        
    }

    connectedCallback() {
        this.subscribeMC();
    }

    handleMessage(message){
        this.receivedMessage = message;
        this.strId = message.lmsData.recordId;
    }

    @wire(getBooks, {strId:'$strId'})
    wiredBooks({ error, data }) {
        if (data) {
            this.books = data;
            this.error = undefined;
            console.log(this.books);
        }
        else if (error) {
            this.error = error;
            this.books = undefined;
            console.log(this.error);
        }
    }

    editBook(event){
        const bookId = this.strId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                //objectApiName: 'Book__c',
                recordId: bookId,
                actionName: 'edit'
            }
        });
    }

    deleteBook(event) {
        deleteRecord(this.strId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                // Navigate to a record home page after
                // the record is deleted, such as to the
                // contact home page
                this[NavigationMixin.Navigate]({
                    type: 'standard__navItemPage',
                    attributes: {
                        apiName: 'My_Library'
                    },
                });
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}