import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ProductActions } from './state/actions';
import { getAllProducts, ProductState } from './state/reducers';
import { Product, ProductForm } from '@app/models';
import { Mode } from '@app/shared/enums';
import { environment } from 'environments/environment';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

    products: Product[] = [];
    closeModal!: string;
    mode!: Mode;
    productId: any;
    editableProduct!: any;

    private imgUrl: string = environment.defaultImg;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    @ViewChild("modalContent") private modalContent!: ElementRef;

    constructor(
        private modalService: NgbModal,
        private store: Store<ProductState>
    ) {
        this.store.select(getAllProducts).pipe(
            takeUntil(this.destroy$)).subscribe(res => this.products = res);
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
        if (this.productId) {
            this.editableProduct = this.products.find(product => Number(product.id) === this.productId);
        }
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

    closeProductPopup() {
        this.modalService.dismissAll();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
