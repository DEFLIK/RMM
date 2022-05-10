import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { catchError, EMPTY, map, merge, Observable, of, share, skipWhile, Subject, takeUntil, throwError } from 'rxjs';
import { ContentType } from './models/content-type';
import { IRequestOptions } from './models/request-options';
import { RequestResponseType } from './models/request-response-type';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    /** Событие для отписки от всех запросов */
    private _takeUntil: Subject<void> = new Subject<void>();

    /** Конструктор класса */
    constructor(
        protected http: HttpClient
    ) { }

    /** Метод для отписки от всех запросов */
    public unsubscribeAll(): void {
        this._takeUntil.next();
    }

    /**
     * Обертка для запроса
     * @param {IRequestOptions<TRequest>} requestParams параметры запроса
     * @returns {Observable<HttpResponse<R>>} ответ
     */
    public request<TResponse, TRequest = null>(requestParams: IRequestOptions<TRequest>): Observable<HttpResponse<TResponse>> {

        const httpOptions: {
            /** Outgoing headers for this request. */
            headers?: HttpHeaders;
            /** Whether this request should be made in a way that exposes progress events. */
            reportProgress?: boolean;
            /** The expected response type of the server. */
            responseType?: RequestResponseType;
            /** Whether this request should be sent with outgoing credentials (cookies). */
            withCredentials?: boolean;
        } = {
            headers: requestParams.headers || new HttpHeaders(),
            reportProgress: false,
            responseType: requestParams.responseType,
            withCredentials: requestParams.withCredentials
        };

        if (!requestParams.contentType) {
            requestParams.contentType = ContentType.json;
        }

        if (httpOptions.headers && 
            !httpOptions.headers.has('Content-Type') && 
            requestParams.contentType !== ContentType.multipartFormData &&
            requestParams.contentType !== ContentType.textXml) {
            httpOptions.headers = httpOptions.headers.set('Content-Type', this.convertContentType(requestParams.contentType));
        }

        if (!requestParams.method) {
            throw new Error('не указан метод запроса');
        }

        if (!requestParams.body) {
            requestParams.body = null;
        }


        const request: HttpRequest<TRequest> = new HttpRequest<TRequest>(requestParams.method, requestParams.url, requestParams.body, httpOptions);

        return (this.http.request<TResponse>(request) as Observable<HttpResponse<TResponse>>)
            .pipe(
                skipWhile((event: HttpResponse<TResponse>) => event.type !== HttpEventType.Response),
                map((value: HttpResponse<TResponse>) => {

                    if (isDevMode()) {
                        const log: any = {};
                        if (requestParams.method) {
                            log[requestParams.method.toLowerCase()] = requestParams.url;
                        }
                        log['request'] = { requestParams, httpOptions };
                        log['response'] = value;
                        console.log(log);
                    }

                    return value;
                }),
                takeUntil(requestParams.unsubscriber ? merge(this._takeUntil, requestParams.unsubscriber) : this._takeUntil),
                share()
            );

    }

    /**
     * Соответствие ключ-значение по контент-тайпу
     * @param {ContentType} contentType енам
     * @returns {string} Возвращает значение по ключу
     */
    private convertContentType(contentType: ContentType): string {
        const m: Map<ContentType, string> = new Map<ContentType, string>([
            [ContentType.raw, ''],
            [ContentType.json, 'application/json'],
            [ContentType.formUrlEncoded, 'application/x-www-form-urlencoded'],
            [ContentType.multipartFormData, 'multipart/form-data'],
            [ContentType.text, 'text'],
            [ContentType.blob, 'application/octet-stream'],
            [ContentType.imageSvg, 'image/svg+xml'],
        ]);

        return m.get(contentType)!;
    }

}
