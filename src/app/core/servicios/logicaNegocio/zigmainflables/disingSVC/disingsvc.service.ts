
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InflablesDisingModel } from 'src/app/core/modelos/logicaNegocio/zigmainflables/dising/inflablesDising.Model';
import { TipoMaterialesModel } from 'src/app/core/modelos/logicaNegocio/zigmainflables/dising/tipoMateriales.Model';

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
