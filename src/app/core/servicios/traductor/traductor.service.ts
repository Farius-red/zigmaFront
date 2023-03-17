import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TraductorService {

  public langs:string[]=[];

  constructor(private traslateSvc: TranslateService) {
     this.setDefultLang();
     this.getLangs();
     
   }

   setDefultLang(){
    this.traslateSvc.setDefaultLang('es');
    this.traslateSvc.addLangs(["es","en"]);
   }
   getLangs(){
    this.langs = this.traslateSvc.getLangs();
    this.traslateSvc.get(this.langs).subscribe(res=>{
      
    })
   }

   use(lenguaje:string){
    this.traslateSvc.use(lenguaje);
   }
}
