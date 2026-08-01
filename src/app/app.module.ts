import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { authInterceptorProviders } from './core/servicios/interceptors/auth.interceptor';
import { environment } from './../environments/environment.prod';

import { ComponentesModule } from './componentes/componentes.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './utils/material/material.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG} from '@ngx-translate/http-loader';
import { CategoriaProductoState, PrimegModule,ProductosState ,UsuariosState} from 'lib-common-angular';
import { Injector } from '@angular/core';
import { setLibraryInjector } from 'lib-common-angular';

export function createTranslateLoader() {
  return new TranslateHttpLoader();
}

@NgModule({ declarations: [AppComponent],

    exports: [
        TranslateModule,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        NgxsModule.forRoot([UsuariosState, ProductosState, CategoriaProductoState], {
            developmentMode: !environment.production
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader)
            }
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        ComponentesModule,
        RouterModule,
        PrimegModule
    ],
    providers: [
        { provide: TRANSLATE_HTTP_LOADER_CONFIG, useValue: { prefix: './assets/i18n/', suffix: '.json' } },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        authInterceptorProviders,
        HTTP,
    ] })
export class AppModule {
    constructor(injector: Injector) {
        setLibraryInjector(injector as any);
    }
}
