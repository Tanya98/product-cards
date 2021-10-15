import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class ProductBackendHttpInterceprot implements HttpInterceptor {
    constructor() { }

    private path = environment.productsData;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.handleRequests(req, next);
    }

    handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
        const { url, method } = req;
        if (url.endsWith("/products") && method === "GET") {
            req = req.clone({
                url: this.path,
            });
            return next.handle(req).pipe(delay(500));
        }
        if (url.endsWith("/products") && method === "POST") {
            const { body } = req.clone();
            return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
        }
        if (url.endsWith("/products") && method === "DELETE") {
            return of(new HttpResponse({ status: 200, })).pipe(delay(500));
        }

        if (url.endsWith("/products") && method === "PUT") {
            const { body } = req.clone();
            return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
        }

        return next.handle(req);
    }

}
