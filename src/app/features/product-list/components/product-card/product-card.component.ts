import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '@app/models';

@Component({
    selector: 'product-card',
    templateUrl: 'product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {

    @Input() product!: Product;

    @Output() remove = new EventEmitter();
    @Output() edit = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    onEdit(productId: any) {
        const id = Number(productId);
        this.edit.emit(id);
    }

    onRemove(productId: any) {
        const id = Number(productId);
        this.remove.emit(id);
    }

}