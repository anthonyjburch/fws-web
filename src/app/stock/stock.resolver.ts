import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Item } from "./item";

@Injectable({
    providedIn: 'root'
})

export class StockResolver implements Resolve<Item[]> {
    constructor(private http: HttpClient) { }

    resolve(): Observable<Item[]> {
        return this.http.get<Item[]>('./assets/stock.json').pipe(
            catchError(err => {
                return of([]);
            })
        )
    }
}