import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(private _http: HttpClient) { }

    public delete<T>(url: string): Observable<T>{
        return this._http.get<T>(
            url)
            .pipe(
                catchError(this.handleError)
            );
    }

    public remove<T>(url: string): Observable<T>{
        return this._http.delete<T>(
            url)
            .pipe(
                catchError(this.handleError)
            );
    }

    public put<T>(url: string, entity: T): Observable<T>{
        return this._http.put<T>(
            url, entity)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(response: HttpErrorResponse): Observable<never> {
        console.log(response.error);

        return of();
    }
}
