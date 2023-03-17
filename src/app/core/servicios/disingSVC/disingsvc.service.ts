
import { InflablesDisingModel } from './../../modelos/dising/inflablesDising.Model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoMaterialesModel } from '../../modelos/dising/tipoMateriales.Model';

@Injectable({
  providedIn: 'root'
})
export class DisingsvcService {


  constructor(private http: HttpClient) { }
 
  
   getMenu(){
     return   this.http.get<InflablesDisingModel[]>('/assets/data/disenios.json');
   }

   getColoresYMateriales(){
   return  this.http.get<TipoMaterialesModel[]>('/assets/data/coloresMaterial.json');
   }
 
}
