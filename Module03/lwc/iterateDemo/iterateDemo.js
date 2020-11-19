import { LightningElement } from 'lwc';

export default class IterateDemo extends LightningElement {
    contacts = [
        {id:'C1', name: 'John Abraham', email: 'ja@gmail.com'},
        {id:'C2', name: 'Brad Pitt', email: 'bpitt@gmail.com'},
        {id:'C3', name: 'Angelina Jolie', email: 'angelj@gmail.com'},
        {id:'C4', name: 'Peter Parker', email: 'spiderman@marvelcomics.com'}
    ]
}