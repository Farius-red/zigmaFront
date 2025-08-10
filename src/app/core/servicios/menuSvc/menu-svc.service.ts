import { MenuActive, MenuModel } from './../../modelos/menu/menu.Model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuSvcService {

  constructor(private http: HttpClient) { }
 menu$ :Observable<MenuActive>;
 
  getMenu(){
    return   this.http.get<MenuModel[]>('/assets/data/menu-opts.json');
  }

 

  
  
  
   


//   initialMenu(nameRol:string){ 
//     let  menu=    this.getMenu();
    
//     let menuFilter :MenuActive={
//       rolActive: nameRol,
//       menuModel: undefined 
//       };
//   debugger;

   
//    menu.subscribe(res=>{
//      menuFilter.menuModel= res.filter(i=> i.nameRol.includes(nameRol));
//       debugger;
      
//       return  this.menu$
//    }
  
//    )
    
//     this.menu$ = new Observable(res=>{
//       res.next(menuFilter)
//     }) ;

//     return this.menu$
   
//  }

      

}
