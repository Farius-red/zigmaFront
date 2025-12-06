
import { ComponentesModule } from './../../componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { Ecommerce1, HomeEcommerce1, HeroSectionEcommerce1, LoadingZigma } from 'lib-common-angular';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    ComponentesModule,
    Ecommerce1,
    HomeEcommerce1,
    HeroSectionEcommerce1,
    LoadingZigma
],
  
  declarations: [InicioPage],

  exports:[InicioPage],
})
export class InicioPageModule {}
