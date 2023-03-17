
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { from, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'upload' | 'download';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    nativeHttp: any;

    constructor(private store : Store, private platform: Platform,){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        let authReq = req;
        this.store.select(state => state.token)
        let token;
        let stateTokem = this.store.select(state => state.usuarios.token);
        stateTokem.subscribe(res=> token=res);
        if(token != null){
            authReq = authReq.clone({
                setHeaders:{Authorization:`Bearer ${token}`}
            })
        }

        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') }); 
            }
            req = req.clone({ headers: req.headers.set('Accept', '*/*') }); 
            req = req.clone({ headers: req.headers.set('Access-Control-Allow-Headers', 'Authorization, Expires, Pragma, DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range') });
         
            if (!this.platform.is('cordova')) { 
                return next.handle(req);
             }
            else{
                return from(this.handleNativeRequest(req));
            }
            
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
     
