import { LightningElement } from 'lwc';

export default class CalcDemo extends LightningElement {
    
    calcExpression;
    result;

    clickClear(){
        this.calcExpression = "";
        this.result = "";
    }

    handleClick(event) {
        this.calcExpression = this.calcExpression + event.target.label;
        /*
        if (event.target.label == "+"){
            this.calcExpression = this.calcExpression + "+" ;
        }
        
        if (event.target.label == "-"){
            this.calcExpression = "";
            this.result = "";
        }
        if (event.target.label == "*"){
            this.calcExpression = "";
            this.result = "";
        }
        if (event.target.label == "/"){
            this.calcExpression = "";
            this.result = "";
        }
        */
    }

}