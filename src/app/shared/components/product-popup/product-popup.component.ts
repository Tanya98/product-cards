import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'product-popup',
    templateUrl: 'product-popup.component.html',
    styleUrls: ['./product-popup.component.scss']
})

export class ProductPopupComponent implements OnInit {
    constructor() { }

    @Input() public title!: string;

    ngOnInit() { 
        console.log(this.title)
    }

}