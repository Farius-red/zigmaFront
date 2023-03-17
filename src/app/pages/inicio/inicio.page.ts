import { Observable } from 'rxjs';
import { MenuSvcService } from './../../core/servicios/menuSvc/menu-svc.service';
import { Component, OnInit } from '@angular/core';
import { MenuModel } from 'src/app/core/modelos/menu/menu.Model';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  menuId:string = "inicio"
  menu:Observable<MenuModel[]>
  constructor(private  menuSvc: MenuSvcService) { }

  ngOnInit() {
    
  }

  

}
