import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlantillaDTO, ProductoDTO } from '@juliaosistem/core-dtos';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ApiResponse<T> {
  data?: T;
  dataList?: T[];
  message?: string;
  rta?: boolean;
  httpStatus?: number;
  status?: number;
  success?: boolean;
}

interface CustomizePlantillaBody {
  id: string;
  nombrePlantilla?: string;
  idDising?: number;
  idUsuario?: number;
  imagen?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PlantillaService {
  private readonly baseUrl = `${environment.baseUrl}/plantilla`;

  constructor(private readonly http: HttpClient) {}

  all(): Observable<ApiResponse<PlantillaDTO>> {
    return this.http.get<ApiResponse<PlantillaDTO>>(`${this.baseUrl}/all`);
  }

  create(payload: PlantillaDTO): Observable<ApiResponse<PlantillaDTO>> {
    return this.http.post<ApiResponse<PlantillaDTO>>(`${this.baseUrl}/create`, payload);
  }

  customize(payload: CustomizePlantillaBody): Observable<ApiResponse<PlantillaDTO>> {
    return this.http.post<ApiResponse<PlantillaDTO>>(`${this.baseUrl}/customize`, payload);
  }

  toProduct(id: string): Observable<ApiResponse<ProductoDTO>> {
    return this.http.get<ApiResponse<ProductoDTO>>(`${this.baseUrl}/to-product/${id}`);
  }

  update(id: string, payload: PlantillaDTO): Observable<ApiResponse<PlantillaDTO>> {
    return this.http.put<ApiResponse<PlantillaDTO>>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<ApiResponse<PlantillaDTO>> {
    return this.http.delete<ApiResponse<PlantillaDTO>>(`${this.baseUrl}/${id}`);
  }
}
