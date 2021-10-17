import { ProductPopupComponent } from './components/product-popup/product-popup.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { COMPONENTS } from '.';
import { TruncatePipe } from './pipes/truncate.pipe';
@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        TruncatePipe
        // ...COMPONENTS,
    ],
    declarations: [
        ProductPopupComponent,
        TruncatePipe
        // ...COMPONENTS,
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
