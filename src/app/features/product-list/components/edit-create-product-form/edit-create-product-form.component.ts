import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductForm } from '@app/models';
import { Mode } from '@app/shared/enums';

@Component({
    selector: 'edit-create-product-form',
    templateUrl: 'edit-create-product-form.component.html',
    styleUrls: ['./edit-create-product-form.component.scss']
})

export class EditCreateProductComponent implements OnInit {

    @Input() mode: Mode = Mode.Create;
    public editCreateForm!: FormGroup;

    @Output() public create = new EventEmitter<ProductForm>();
    @Output() public edit = new EventEmitter<ProductForm>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.editCreateForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$")]],
            description: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
            price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        })
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
    }
}