
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisingDTO } from '@juliaosistem/core-dtos';
import { Observable, map } from 'rxjs';
import { InflablesDisingModel } from 'src/app/core/modelos/logicaNegocio/zigmainflables/dising/inflablesDising.Model';
import { TipoMaterialesModel } from 'src/app/core/modelos/logicaNegocio/zigmainflables/dising/tipoMateriales.Model';
import { environment } from 'src/environments/environment';

interface ApiResponse<T> {
  data?: T;
  dataList?: T[];
  message?: string;
  rta?: boolean;
  httpStatus?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DisingsvcService {
  private readonly baseUrl = `${environment.baseUrl}/dising`;


  constructor(private http: HttpClient) { }
 
  
   getMenu(): Observable<InflablesDisingModel[]> {
     return this.http
       .get<ApiResponse<DisingDTO>>(`${this.baseUrl}/all`)
       .pipe(
         map((response) => {
           const disings = response.dataList || (response.data ? [response.data] : []);
           return disings.map((item) => ({
             id: item.id,
             nombrePieza: item.nombre_dising,
             cantidad: 1,
             color: item.comentario || '',
             material: 0,
             medida: item.guiaCostura || '',
           }));
         })
       );
   }

   getDisingsRaw(): Observable<ApiResponse<DisingDTO>> {
    return this.http.get<ApiResponse<DisingDTO>>(`${this.baseUrl}/all`);
   }

   addDising(payload: DisingDTO): Observable<ApiResponse<DisingDTO>> {
    return this.http.post<ApiResponse<DisingDTO>>(`${this.baseUrl}/add`, payload);
   }

   updateDising(id: string, payload: DisingDTO): Observable<ApiResponse<DisingDTO>> {
    return this.http.put<ApiResponse<DisingDTO>>(`${this.baseUrl}/${id}`, payload);
   }

   deleteDising(id: string): Observable<ApiResponse<DisingDTO>> {
    return this.http.delete<ApiResponse<DisingDTO>>(`${this.baseUrl}/${id}`);
   }

   getColoresYMateriales(){
   return  this.http.get<TipoMaterialesModel[]>('/assets/data/coloresMaterial.json');
   }
 
}
