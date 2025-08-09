import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { authInterceptorProviders } from './core/servicios/interceptors/auth.interceptor';
import { UsuariosState } from './../state/usuarios.state';
import { environment } from './../environments/environment.prod';

import { ComponentesModule } from './componentes/componentes.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './utils/material/material.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MenuState } from 'src/state/menu.state';
import { ProductState } from 'src/state/productos.state ';
import { disenioState } from 'src/state/logicanegocio/zigmainflables/disenios.state';
import { RutinaState } from 'src/state/logicanegocio/wellnesfit/rutina.state';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        NgxsModule.forRoot([MenuState, ProductState, UsuariosState, disenioState, RutinaState], {
            developmentMode: !environment.production
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        ComponentesModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        authInterceptorProviders,
        HTTP,
        // { provide: HTTP_INTERCEPTORS,useClass: InterceptorService,multi:true }
    ],
    exports: [
        TranslateModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
