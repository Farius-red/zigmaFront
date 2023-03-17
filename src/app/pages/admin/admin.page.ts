import { getMenu } from './../../../state/menu.actions';
import { MenuSvcService } from './../../core/servicios/menuSvc/menu-svc.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { MenuModel } from 'src/app/core/modelos/menu/menu.Model';
import { Select, Store } from '@ngxs/store';
import { MenuState } from 'src/state/menu.state';
import { Menu } from 'src/assets/utils/enums/menu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  title: string = "admin";
  menuId:string ="inicio";
  @Select(MenuState.getMenulist) menu$:Observable<MenuModel[]>;
  constructor( 
   
    private route: Router,
    private store :Store,
    ) { }

  ngOnInit() {
    
    this.verificarRutas();
  }

  verificarRutas(){
    this.store.dispatch(new getMenu(Menu.ADMIN));
  }
}
