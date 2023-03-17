import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as ɵngcc0 from '@angular/core';
export declare class JuliaoSystemBaseHttpService {
    protected http: HttpClient;
    constructor(http: HttpClient);
    post<T>(url: string, params: any): Promise<T>;
    postOb<T>(url: string, params: any): Observable<any>;
    get<T>(url: string): Promise<T>;
    getOb<T>(url: string): Observable<any>;
    delete<T>(url: string): Promise<T>;
    deleteOb<T>(url: string): Observable<any>;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<JuliaoSystemBaseHttpService, never>;
}
