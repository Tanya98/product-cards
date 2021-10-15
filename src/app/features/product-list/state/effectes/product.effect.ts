import { ProductService } from 'src/app/services';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map, concatMap } from 'rxjs/operators';
import { ProductActions } from '../actions';
import { Product } from 'src/app/models';

@Injectable()
export class ProductEffects {
    constructor(
        private $action: Actions,
        private productService: ProductService
    ) { }

    loadProducts$ = createEffect(() => this.$action.pipe(

        ofType(ProductActions.loadProducts),
        mergeMap(() => this.productService.getAllProducts()
            .pipe(
                map((products: Product[]) => {
                    return ProductActions.productsLoaded({ products })
                })
            ))
    ));

    createProduct$ = createEffect(() => this.$action.pipe(
        ofType(ProductActions.createProduct),
        concatMap((action) => this.productService.addOneProduct(action.product)),
    ),
        { dispatch: false }
    );

    deleteProduct$ = createEffect(() => this.$action.pipe(
        ofType(ProductActions.deleteProduct),
        concatMap((action) => this.productService.deleteOneProduct(action.productId)),
    ),
        { dispatch: false }
    );

    updateProduct$ = createEffect(() => this.$action.pipe(
        ofType(ProductActions.updateProduct),
        concatMap((action) => this.productService.updateOneProduct(action.update.id, action.update.changes)),
    ),
        { dispatch: false }
    );

}