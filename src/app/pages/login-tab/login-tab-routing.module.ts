import { LoginComponent } from './../../componentes/auth/login/login.component';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from 'src/app/componentes/auth/registro/registro.component';

import { LoginTabPage } from './login-tab.page';

const routes: Routes = [
  {
    path: '',
    component: LoginTabPage,
    children:[
       {
         path: 'registro',
          component: RegistroComponent
       },

       {
         path: 'login',
         component: LoginComponent
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginTabPageRoutingModule {}
