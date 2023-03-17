import { MenuSvcService } from './../app/core/servicios/menuSvc/menu-svc.service';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { MenuActive, MenuModel } from 'src/app/core/modelos/menu/menu.Model';
import { getMenu } from './menu.actions';
import { Menu } from 'src/assets/utils/enums/menu';



@State<MenuActive>({
  name: 'menu',
  defaults:{
    rolActive:Menu.USER,
    menuModel:[],   
  }
})

@Injectable()
export class MenuState {

constructor(private readonly MenuSvc:MenuSvcService ){}

@Selector()
public static getMenulist({menuModel}:MenuActive){
  return menuModel;
}


  @Action(getMenu)
  getMenu({ getState, setState}: StateContext<MenuActive>, 
    { payload }: getMenu) {
      return this.MenuSvc.getMenu().subscribe(
        res=>{
         
       let menuModel:MenuModel[]= res.filter(e=>e.nameRol.includes(payload))
         
           const state = getState();
           setState({ ...state, menuModel })
           
          });
}
 

}
