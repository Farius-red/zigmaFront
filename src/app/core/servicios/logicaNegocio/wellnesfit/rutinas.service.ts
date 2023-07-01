import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { PlantillaResponse } from 'src/app/core/modelos/PlantillaResponse';
import { RutinaDTO } from 'src/app/core/modelos/logicaNegocio/wellnesfit/RutinaDTO.model';
import { JuliaoSystemCrudHttpService } from '../../crud/juliaoSystemCrudHttpService';

@Injectable({
  providedIn: 'root'
})
export class RutinasService extends JuliaoSystemCrudHttpService<PlantillaResponse<RutinaDTO>>  {

  
  constructor(
    protected http: HttpClient,  
  ) {
    super(http);
    this.basePathUrl = environment.baseUrlProducts+"/rutina/";
  }
}
