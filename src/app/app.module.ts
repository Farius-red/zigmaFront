import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { authInterceptorProviders } from './core/servicios/interceptors/auth.interceptor';
import { environment } from './../environments/environment';

import { ComponentesModule } from './componentes/componentes.module';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './utils/material/material.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG} from '@ngx-translate/http-loader';
import { MenuState } from 'src/state/menu.state';
import { ProductState } from 'src/state/productos.state ';
import { disenioState } from 'src/state/logicanegocio/zigmainflables/disenios.state';
import { RutinaState } from 'src/state/logicanegocio/wellnesfit/rutina.state';
import { CarritoState, CategoriaProductoState, LIB_COMMON_CONFIG, PrimegModule, ProductosState, UsuariosState, setLibraryInjector } from 'lib-common-angular';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

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
        NgxsModule.forRoot([MenuState, ProductState, UsuariosState, CarritoState, disenioState, RutinaState, ProductosState, CategoriaProductoState], {
            developmentMode: !environment.production
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader)
            }
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        ComponentesModule,
        RouterModule,
        PrimegModule
    ],
    providers: [
        { provide: LIB_COMMON_CONFIG, useValue: environment.commonConfig },
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        { provide: TRANSLATE_HTTP_LOADER_CONFIG, useValue: { prefix: './assets/i18n/', suffix: '.json' } },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        authInterceptorProviders,
        HTTP,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
    ] })
export class AppModule {
  constructor(injector: Injector) {
    setLibraryInjector(injector);
  }
}
