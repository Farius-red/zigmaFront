import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Third } from '../../modelos/Third';

@Injectable({
  providedIn: 'root'
})
export class ServiceThird {
  

  constructor(private http:HttpClient) {}

  Url='http://localhost:8080/third';
  
  saveThird(third:Third){
    return this.http.post<Third>(this.Url,third);
  }

  getListThirds(){
    return this.http.get<Third>(this.Url);
  }





/**
  getProduct(){
    return this.http.get<Product[]>(this.Url);
  }


  getProductId(id:number){
    return this.http.get<Product>(this.Url+"/"+id);
  }

  updateProduct(product:Product){
    return this.http.post<Product>(this.Url,product);
  }

  deleteProduct(product:Product){
    return this.http.delete<Product>(this.Url+"/"+product.id);
  }
 */

}
