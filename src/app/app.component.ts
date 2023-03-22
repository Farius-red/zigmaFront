import { MenuModel } from './core/modelos/menu/menu.Model';
import { MenuState } from 'src/state/menu.state';
import { getMenu } from './../state/menu.actions';
import { Component } from '@angular/core';
import {   TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import {  Router } from '@angular/router';
import { Select,  Store } from '@ngxs/store';
import { Menu } from 'src/assets/utils/enums/menu';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  langs:string[]=[];
  keywords:string;
  seleccionada:string

@Select(MenuState.getMenulist) menu$:Observable<MenuModel[]>;
menuId:string ="inicio";
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translate: TranslateService,
    
    private route : Router,
    private store : Store
                                       )
  { 
    this.langs= this.translate.getLangs();
    this.translate.setDefaultLang('en');
    this.translate.setDefaultLang('es');
      this.translate.addLangs(["es","en"]);
      this.translate.use('es');
    
  }


  ngOnInit(): void {
    this.verificarRutas(); 
    this.addMetas();
  }


  cambiaLang(event:any){
   
    this.translate.use(event)
     
   }
 verificarRutas(){
 
  
    if(this.route.url == "/")
      this.store.dispatch(new getMenu(Menu.USER));
      this.menu$.subscribe(res=>{
        console.log(res);
      })
 }

  addMetas(){
    this.translate.stream("meta_key_words.title").subscribe(res  => this.titleService.setTitle(res)); 
   this.translate.stream("meta_key_words.keywords").subscribe(r=> {
     if(r != "meta_key_words.keywords")
      this.metaService.addTag({name: 'keywords', content: `${r}`});
    });

    this.translate.stream("meta_key_words.description").subscribe(r=> {
      if(r != "meta_key_words.description")
       this.metaService.addTag({name: 'description', content: `${r}`});
     });

    this.metaService.addTag({name: 'robots', content: 'index, follow'});
  }
  configLangs() {
    // Add languages
    this.translate.addLangs(['en', 'es']);
  
    if (this.translate.getBrowserLang() == 'en') {
       this.translate.use('en');
     } else if (this.translate.getBrowserLang() == 'es') {
       this.translate.use('es');
     } else {
       this.translate.use('en');
          }
      }

      loadData(data){
        console.log(data);
      }
}