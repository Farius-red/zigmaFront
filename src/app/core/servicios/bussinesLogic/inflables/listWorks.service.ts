import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { JuliaoSystemCrudHttpService } from '../../crud/juliaoSystemCrudHttpService';
import { TrabajosModel } from 'src/app/core/modelos/trabajos/Trabajos.model';



@Injectable({
  providedIn: 'root'
})

export class ProductService extends JuliaoSystemCrudHttpService<TrabajosModel> {
  
    constructor(
      protected http: HttpClient,  
    ) {
      super(http);
      this.basePathUrl = environment.baseUrlProducts+"/product";
    }

    
   
  }