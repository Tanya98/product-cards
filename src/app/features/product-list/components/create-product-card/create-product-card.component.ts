import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'create-product-card',
    templateUrl: 'create-product-card.component.html',
    styleUrls: ['./create-product-card.component.scss']
})

export class CreateProductCardComponent implements OnInit {

    public title = 'Create Product Form';
    constructor() { }

    ngOnInit() { }
}

