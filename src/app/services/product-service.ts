import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    private url = environment.productsUrl;

    public getAllProducts() {
        return this.http.get<Product[]>(this.url)
            .pipe(catchError(this.handleError));
    }

    public addOneProduct(product: Product) {
        return this.http.post<Product>(this.url, product)
            .pipe(catchError(this.handleError));
    }

    public deleteOneProduct(productId: number) {
        return this.http.delete<Product>(this.url)
            .pipe(catchError(this.handleError));
    }

    public updateOneProduct(productId: number| string, changes: Partial<Product>) {
        return this.http.put<Product>(this.url, changes)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error("An error occurred:", error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        return throwError("Something bad happened; please try again later.");
    }
}