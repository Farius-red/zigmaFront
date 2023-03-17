import {TranslateService} from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

@Input() menuId:string;
seleccionada:string

 langs:string[]=[];
  constructor(
    private translate: TranslateService ) { 
      
      this.langs= this.translate.getLangs();
      this.translate.setDefaultLang('en');
      this.translate.setDefaultLang('es');
        this.translate.addLangs(["es","en"]);
        this.translate.use('es');
       console.log(this.seleccionada)
  }

  ngOnInit() {
 
  }



  cambiaLang(event:any){
   console.log(event)
   this.translate.use(event)
    
  }

}
