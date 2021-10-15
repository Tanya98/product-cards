import { ProductEffects } from './state/effectes/product.effect';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { productReducer } from './state/reducers';
import { ProductCardComponent } from 'src/app/features/product-list/components/product-card/product-card.component';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { CreateProductCardComponent } from 'src/app/features/product-list/components/create-product-card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/shared/shared.module';
import { EditCreateProductComponent } from './components/edit-create-product-form/edit-create-product-form.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductCardComponent,
        CreateProductCardComponent,
        EditCreateProductComponent
        
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ProductListRoutingModule,
        StoreModule.forFeature('product', productReducer),
        EffectsModule.forFeature([ProductEffects]),
        NgbModule,
        SharedModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductListModule { }
