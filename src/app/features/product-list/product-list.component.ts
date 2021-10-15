import { imgUrl } from './../../../environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, ProductForm } from 'src/app/models';
import { ProductActions } from './state/actions';
import { getAllProducts, ProductState } from './state/reducers';
import { Mode } from 'src/app/shared/enums';


@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    products$!: Observable<Product[]>;
    closeModal!: string;
    mode!: Mode;
    productId: any;

    private imgUrl: string = imgUrl;

    @ViewChild("modalContent") private modalContent!: ElementRef;

    constructor(
        private modalService: NgbModal,
        private store: Store<ProductState>
    ) {
        this.products$ = this.store.select(getAllProducts);
    }

    onCardCreate() {
        this.mode = Mode.Create;
        this.triggerModal(this.modalContent);
    }

    onCardRemove(id: any) {
        this.store.dispatch(ProductActions.deleteProduct({ productId: id }))
    }

    onCardEdit(productId: any) {
        this.mode = Mode.Edit;
        this.productId = productId;
        this.triggerModal(this.modalContent);
    }

    onProductCreate(product: ProductForm) {
        const productId = Math.floor(Math.random() * 100);

        const newProduct: Product = {
            id: productId,
            name: product.name,
            description: product.description,
            price: product.price,
            image: this.imgUrl
        }

        this.store.dispatch(ProductActions.createProduct({ product: newProduct }))
    }

    onProductEdit(product: ProductForm) {
        const updatedProduct: Update<Product> = {
            id: this.productId,
            changes: {
                id: this.productId,
                name: product.name,
                description: product.description,
                price: product.price,
                image: this.imgUrl
            }

        }
        this.store.dispatch(ProductActions.updateProduct({ update: updatedProduct }))
    }

    ngOnInit() {
        this.store.dispatch(ProductActions.loadProducts());
    }

    triggerModal(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeModal = `Closed with: ${result}`;
        }, (reason) => {
            this.closeModal = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
