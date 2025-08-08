import { SlidersComponent } from './utils/sliders/sliders.component';
import { ModalPadreComponent } from './utils/modales/modal-padre/modal-padre.component';
import { RegistroTrabajosComponent } from './utils/modales/registro-trabajos/registro-trabajos.component';
import { ListaTrabajosComponent } from './utils/lista-trabajos/lista-trabajos.component';



import { TablaPadreComponent } from './utils/tablas/tabla-padre.component';


import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './inicio/header/header.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroComponent } from './auth/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../utils/material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './inicio/footer/footer.component';

import { CardPadreComponent } from './inicio/card-padre/card-padre.component';
import { CardProductsComponent } from './utils/cards/card-products/card-products.component';
import { CardTablasComponent } from './utils/cards/card-tablas/card-tablas.component';




@NgModule({
  declarations: [ 
     HeaderComponent,
     FooterComponent,
     LoginComponent,
     TablaPadreComponent,
     RegistroComponent,
     CardProductsComponent,
     CardTablasComponent,
     CardPadreComponent,
     ListaTrabajosComponent,
     RegistroTrabajosComponent,
     ModalPadreComponent,
     SlidersComponent,
    ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule,
    FormsModule,
    TranslateModule,
   
    
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    TablaPadreComponent,
    RegistroComponent,
    TranslateModule,
    CardProductsComponent,
    CardTablasComponent,
    CardPadreComponent,
    ListaTrabajosComponent,
    RegistroTrabajosComponent,
    ModalPadreComponent,
    SlidersComponent,
   
   
  ]
})
export class ComponentesModule { }
