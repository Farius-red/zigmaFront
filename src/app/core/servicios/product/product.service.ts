import { HttpClient } from '@angular/common/http';
import { ProductVO } from './../../modelos/productos/productVO';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { MatDialog } from "@angular/material/dialog";
import { JuliaoSystemCrudHttpService } from '../crud/juliaoSystemCrudHttpService';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class ProductService extends JuliaoSystemCrudHttpService<ProductVO> {
  
    constructor(
      protected http: HttpClient,
      protected dialog: MatDialog
    ) {
      super(http);
      this.basePathUrl = environment.baseUrlProducts+"/product";
    }
   
  }