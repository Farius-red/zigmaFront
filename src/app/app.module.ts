import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { authInterceptorProviders } from './core/servicios/interceptors/auth.interceptor';
import { UsuariosState } from './../state/usuarios.state';
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
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './utils/material/material.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG} from '@ngx-translate/http-loader';
import { MenuState } from 'src/state/menu.state';
import { ProductState } from 'src/state/productos.state ';
import { disenioState } from 'src/state/logicanegocio/zigmainflables/disenios.state';
import { RutinaState } from 'src/state/logicanegocio/wellnesfit/rutina.state';
import { CategoriaProductoState, PrimegModule } from 'lib-common-angular';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {ProductosState} from 'lib-common-angular';

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
        NgxsModule.forRoot([MenuState, ProductState, UsuariosState, disenioState, RutinaState, ProductosState, CategoriaProductoState], {
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
        MaterialModule,
        ComponentesModule,
        RouterModule,
        PrimegModule
    ],
    providers: [
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        { provide: TRANSLATE_HTTP_LOADER_CONFIG, useValue: { prefix: './assets/i18n/', suffix: '.json' } },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        authInterceptorProviders,
        HTTP,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
