

import { ComponentesModule } from './../../componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginTabPageRoutingModule } from './login-tab-routing.module';

import { LoginTabPage } from './login-tab.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginTabPageRoutingModule,
    ComponentesModule,
    TranslateModule
   ],
  declarations: [LoginTabPage]
})
export class LoginTabPageModule {}
