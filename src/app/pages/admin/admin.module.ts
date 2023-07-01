import { ComponentesModule } from './../../componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { ListaRutinasComponent } from './wellnesfit/lista-rutinas/lista-rutinas.component';

@NgModule({
  declarations: [AdminPage,ListaRutinasComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    ComponentesModule,
    
  ],
  exports:[
      AdminPage,
      ListaRutinasComponent
  ],
  
})
export class AdminPageModule {}
