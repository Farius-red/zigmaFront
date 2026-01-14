import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Third } from 'src/app/core/modelos/Third';
import { ServiceThird } from 'src/app/core/servicios/formularios/service.third';


@Component({
    selector: 'app-third-add-form',
    templateUrl: './add.FormComponent.html',
    styleUrls: ['./add.FormComponent.scss'],
    standalone: false
})
export class addFormComponent implements OnInit {
  titulo= "Crear Tercero";
  cliente : Third =new Third();
  error:any;
  
  constructor(private service : ServiceThird,
    private router : Router,
    private route : ActivatedRoute
    
    
    )
    
    { }

    ngOnInit() {
      this.route.paramMap.subscribe(params=>{
      //const id:number = +params.get('id');
      if(true){
        this.service.getListThirds();
        }
      
      })
        }
 



}
