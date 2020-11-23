import { LightningElement } from 'lwc';

export default class CalcDemo extends LightningElement {
    
    calcExpression;
    result;

    clickClear(){
        this.calcExpression = "";
        this.result = "";
    }

    clickEqual(){
        this.result = this.calcExpression;
        this.calcExpression = "";
    }
    
    handleClick(event) {
        this.calcExpression = this.calcExpression + event.target.label;
        
    }

}
