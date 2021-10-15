import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models";

// export const increment = createAction('[Counter Component] Increment');
// export const decrement = createAction('[Counter Component] Decrement');
// export const reset = createAction('[Counter Component] Reset');


export namespace ProductActions {

// export class LoadProducts implements Action {
//     readonly type = '[Product/API] Load Products via Service';
//     constructor() { }
// }

export const loadProducts = createAction(
    '[Product/API] Load Products via Service',
);

export const productsLoaded = createAction(
    '[Product/API] Products Loaded Successfully',
    props<{ products: Product[] }>()
);

export const getFourLastProducts = createAction(
    '[Product/API] Get Four Last Products',
);

export const createProduct = createAction(
    '[Product/API] Create Products',
    props<{ product: Product }>()
);

export const deleteProduct = createAction(
    '[Product/API] Delete Products',
    props<{ productId: number }>()
);

export const updateProduct = createAction(
    '[Product/API] Update Products',
    props<{ update: Update<Product> }>()
);
}