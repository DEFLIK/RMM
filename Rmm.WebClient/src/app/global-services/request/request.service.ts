import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(private _http: HttpClient) { }

    public get<TResponse>(url: string): Observable<TResponse>{
        return this._http.get<TResponse>(
            url)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getAsFile(url: string): Observable<Blob> {
        return this._http.get(
            url, { responseType: 'blob' })
            .pipe(
                catchError(this.handleError)
            );
    }

    public delete<TResponse>(url: string): Observable<TResponse>{
        return this._http.delete<TResponse>(
            url)
            .pipe(
                catchError(this.handleError)
            );
    }

    public put<TResponse, TRequest>(url: string, entity: TRequest): Observable<TResponse> {
        return this._http.put<TResponse>(
            url, entity)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(response: HttpErrorResponse): Observable<never> {
        console.log('error:', response.error);

        return throwError(response);
    }
}
