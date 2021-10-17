import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductForm } from '@app/models';
import { Mode } from '@app/shared/enums';

@Component({
    selector: 'edit-create-product-form',
    templateUrl: 'edit-create-product-form.component.html',
    styleUrls: ['./edit-create-product-form.component.scss']
})

export class EditCreateProductComponent implements OnInit {

    @Input() mode: Mode = Mode.Create;
    @Input() productData!: Product;

    public editCreateForm!: FormGroup;
    private nameValidator =  Validators.pattern("^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$");
    private descriptionValidator =  Validators.pattern("^[a-zA-Z0-9_:.,-]+( [a-zA-Z0-9_:.,-]+)*$");
    private priceValidator =  Validators.pattern("^[0-9]*$");

    @Output() public create = new EventEmitter<ProductForm>();
    @Output() public edit = new EventEmitter<ProductForm>();
    @Output() public close = new EventEmitter();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

        switch (this.mode) {
            case Mode.Edit:
                this.editCreateForm = this.formBuilder.group({
                    name: [this.productData.name, [Validators.required, this.nameValidator]],
                    description: [this.productData.description, [Validators.required, this.descriptionValidator]],
                    price: [this.productData.price, [Validators.required, this.priceValidator]],
                })
                break;
            default:
                this.editCreateForm = this.formBuilder.group({
                    name: ['', [Validators.required, this.nameValidator]],
                    description: ['', [Validators.required, this.descriptionValidator]],
                    price: ['', [Validators.required, this.priceValidator]],
                })
        }

    }

    get productName() {
        return this.editCreateForm.get('name');
    }

    get productDescription() {
        return this.editCreateForm.get('description');
    }

    get productPrice() {
        return this.editCreateForm.get('price');
    }

    submitForm(form: FormGroup) {
        if (form.valid) {
            const product = form.value as ProductForm;

            switch (this.mode) {
                case Mode.Edit:
                    this.edit.emit(product);
                    break;
                default:
                    this.create.emit(product);
            }
        }
        form.reset();
        this.close.emit();
    }
}