import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentesModule } from './componentes/componentes.module';
import { MaterialModule } from './utils/material/material.module';
import { authInterceptorProviders } from './core/servicios/interceptors/auth.interceptor';
import { environment } from './../environments/environment.prod';

import {
  CategoriaProductoState,
  PrimegModule,
  ProductosState,
  UsuariosState,
  setLibraryInjector,
} from 'lib-common-angular';

// Factoría de traducción recibiendo HttpClient explícitamente
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader();
}

// Función de inicialización para registrar el Injector en tu librería sin romper el arranque
export function initLibraryInjector(injector: Injector) {
  return () => {
    setLibraryInjector(injector as any);
  };
}

@NgModule({
  declarations: [AppComponent],
  exports: [TranslateModule],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxsModule.forRoot([UsuariosState, ProductosState, CategoriaProductoState], {
      developmentMode: !environment.production,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient], // Dependencia requerida para TranslateHttpLoader
      },
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
    PrimegModule,
  ],
  providers: [
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: { prefix: './assets/i18n/', suffix: '.json' },
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    authInterceptorProviders,
    HTTP,
    // Inicializador seguro del inyector usando APP_INITIALIZER
    {
      provide: APP_INITIALIZER,
      useFactory: initLibraryInjector,
      deps: [Injector],
      multi: true,
    },
  ],
})
export class AppModule {}