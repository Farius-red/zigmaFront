import { ListaTrabajosComponent } from './../../componentes/utils/lista-trabajos/lista-trabajos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaPadreComponent } from '../../componentes/utils/tablas/tabla-padre.component';
import { RegistroComponent } from 'src/app/componentes/auth/registro/registro.component';
import { AdminPage } from './admin.page';
import { ListaRutinasComponent } from './wellnesfit/lista-rutinas/lista-rutinas.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children:[
       {
         path: 'agregarUsr',
          component: RegistroComponent
       },

       {
         path: 'listaUsuarios',
         component: TablaPadreComponent
       },
       {
        path: 'wellnesfit/listaRutinas',
         component: ListaRutinasComponent
       },
       {
         path: 'lista-trabajos',
         component: ListaTrabajosComponent
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
