
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibConfigService } from 'lib-common-angular';
import { from, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'upload' | 'download';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    nativeHttp: any;

    constructor(private config: LibConfigService, private platform: Platform,){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        req = this.withSession(req);
         
            if (!this.platform.is('cordova')) { 
                return next.handle(req);
             }
            else{
                return from(this.handleNativeRequest(req));
            }
    }

 private withSession(request: HttpRequest<unknown>): HttpRequest<unknown> {
            const urls = Object.entries(this.config.getConfig())
              .filter(([key, value]) => key.startsWith('baseUrl') && typeof value === 'string')
              .map(([, value]) => String(value).replace(/\/$/, ''));
            const target = new URL(request.url, window.location.origin);
            const trusted = urls.some(url => {
              const base = new URL(url, window.location.origin);
              return target.origin === base.origin && (target.pathname === base.pathname || target.pathname.startsWith(base.pathname + '/'));
            });
            const isPublic = /\/user\/(login(?:\/social)?|add|refresh(?:-session)?|logout)$/.test(target.pathname);
            const tokenKey = /\/user\/(valid|roles)$/.test(target.pathname) ? 'keycloakAccessToken' : 'businessToken';
            const token = sessionStorage.getItem(tokenKey) || localStorage.getItem(tokenKey);
            return trusted && !isPublic && token && !request.headers.has('Authorization')
              ? request.clone({ setHeaders: { Authorization: `Bearer ${token}`, token } }) : request;
 }

 private async handleNativeRequest(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    const headerKeys = request.headers.keys();
    const headers = {};
   
    headerKeys.forEach((key) => {
    headers[key] = request.headers.get(key);
    });
   
    try {
    await this.platform.ready();
   
    const method = <HttpMethod> request.method.toLowerCase();
   
    const nativeHttpResponse = await this.nativeHttp.sendRequest(request.url, {
    method: method,
    data: request.body,
    headers: headers,
    serializer: 'json',
    });
   
    let body;
   
    try {
    body = JSON.parse(nativeHttpResponse.data);
    } catch (error) {
    body = { response: nativeHttpResponse.data };
    }
   
    const response = new HttpResponse({
    body: body,
    status: nativeHttpResponse.status,
    headers: request.headers, //nativeHttpResponse.headers,
    url: nativeHttpResponse.url,
    });
   
    return Promise.resolve(response);
    } catch (error) {
    if (!error.status) { return Promise.reject(error); }
   
    const response = new HttpResponse({
    body: JSON.parse(error.error),
    status: error.status,
    headers: error.headers,
    url: error.url,
    });
   
    return Promise.reject(response);
    }
    }

} 
export const authInterceptorProviders =[
    {provide: HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi: true
    },
  
]
     
