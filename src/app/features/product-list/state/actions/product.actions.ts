import { Product } from "@app/models";
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";

export namespace ProductActions {

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