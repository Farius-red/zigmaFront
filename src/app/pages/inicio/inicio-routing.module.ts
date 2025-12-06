import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';
import { LoginEcommerce1, RegisterEcommerce1, Ecommerce1 } from 'lib-common-angular';

const routes: Routes = [
  {
    path: '',
    component: Ecommerce1,
    data: {
      routePaths: {
        home: './',
        login: 'login',
        register: 'registro'
      }
    },
    children:[
      {
            path: 'login',
            loadComponent: () =>
              import('lib-common-angular').then(m => m.LoginEcommerce1)
          },
          {
            path: 'registro',
            loadComponent: () =>
              import('lib-common-angular').then(m => m.RegisterEcommerce1)
          },
          {
            path:'',
            component: InicioPage
        }
    ]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
