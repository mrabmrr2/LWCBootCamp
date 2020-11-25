import { LightningElement, api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import CONTACT_ACCOUNT_NAME_FIELD from '@salesforce/schema/Contact.AccountId';
import OPPORTUNITY_NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import OPPORTUNITY_STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import OPPORTUNITY_CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import OPPORTUNITY_ACCOUNT_NAME_FIELD from '@salesforce/schema/Opportunity.AccountId';

export default class QuickCreate extends LightningElement {

    accountFields = [ACCOUNT_NAME_FIELD];
    contactFields = [CONTACT_NAME_FIELD, CONTACT_ACCOUNT_NAME_FIELD];
    opportunityFields = [OPPORTUNITY_NAME_FIELD, OPPORTUNITY_STAGE_FIELD, OPPORTUNITY_CLOSEDATE_FIELD, 
                        OPPORTUNITY_ACCOUNT_NAME_FIELD];

    handleSuccessAccount(event) {
        const evt = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }

    handleSuccessContact(event) {
        const evt = new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }

    handleSuccessOpportunity(event) {
        const evt = new ShowToastEvent({
            title: "Opportunity created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }
}