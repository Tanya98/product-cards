import { Product } from '@app/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ProductActions } from '../actions';

export interface ProductState extends EntityState<Product> {
    productsLoaded: boolean;
    products: Product[],
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = adapter.getInitialState({
    productsLoaded: false,
    products: []
})

export const productReducer = createReducer(initialState,

    on(ProductActions.productsLoaded, (state, { products }) => {
        return adapter.addMany(products, { ...state, productsLoaded: true });
    }),
    on(ProductActions.createProduct, (state, { product }) => {
        return adapter.addOne(product, state);
    }),
    on(ProductActions.deleteProduct, (state, { productId }) => {
        return adapter.removeOne(productId, state);
    }),
    on(ProductActions.updateProduct, (state, { update }) => {
        return adapter.updateOne(update, state);
    }),

    on(ProductActions.getFourLastProducts, (state) => {
        return {
            ...state,
            ...state.products.slice(-4, state.products.length)
        };
    }),
);

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();


export const courseFeatureSelector = createFeatureSelector<ProductState>('product');

export const getAllProducts = createSelector(
    courseFeatureSelector,
    selectAll
);
