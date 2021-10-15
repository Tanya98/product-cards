import { ProductEffects } from './state/effectes/product.effect';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { productReducer } from './state/reducers';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/shared/shared.module';
import { ProductCardComponent } from './components/product-card';
import { CreateProductCardComponent } from './components/create-product-card';
import { EditCreateProductComponent } from './components/edit-create-product-form';

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
