import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarritoDTO } from '@juliaosistem/core-dtos';
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

interface HeaderParams {
  topic?: string;
  [key: string]: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private readonly baseUrl = `${environment.baseUrl}/carrito`;

  constructor(private readonly http: HttpClient) {}

  add(payload: CarritoDTO, headers?: HeaderParams): Observable<ApiResponse<CarritoDTO>> {
    return this.http.post<ApiResponse<CarritoDTO>>(`${this.baseUrl}/add`, payload, {
      headers: this.buildHeaders(headers),
    });
  }

  allByUser(idUsuario: string): Observable<ApiResponse<CarritoDTO[]>> {
    return this.http.get<ApiResponse<CarritoDTO[]>>(`${this.baseUrl}/all`, {
      params: { idUsuario },
    });
  }

  update(id: string, payload: CarritoDTO, headers?: HeaderParams): Observable<ApiResponse<CarritoDTO>> {
    return this.http.put<ApiResponse<CarritoDTO>>(`${this.baseUrl}/${id}`, payload, {
      headers: this.buildHeaders(headers),
    });
  }

  delete(id: string): Observable<ApiResponse<CarritoDTO>> {
    return this.http.delete<ApiResponse<CarritoDTO>>(`${this.baseUrl}/${id}`);
  }

  confirmarPedido(
    idCarrito: string,
    medioPagoId: string,
    headers?: HeaderParams
  ): Observable<ApiResponse<CarritoDTO>> {
    return this.http.post<ApiResponse<CarritoDTO>>(
      this.baseUrl,
      { idCarrito, medioPagoId },
      { headers: this.buildHeaders(headers) }
    );
  }

  private buildHeaders(headers?: HeaderParams): HttpHeaders {
    let result = new HttpHeaders();
    if (!headers) {
      return result;
    }

    Object.keys(headers).forEach((key) => {
      const value = headers[key];
      if (value) {
        result = result.set(key, value);
      }
    });

    return result;
  }
}
