import { PlantillaResponse } from './../../../app/core/modelos/PlantillaResponse';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { RutinaDTO } from "src/app/core/modelos/logicaNegocio/wellnesfit/RutinaDTO.model";
import { getAllRutinas } from './rutina.actions';
import { RutinasService } from 'src/app/core/servicios/logicaNegocio/wellnesfit/rutinas.service';
import { PlantillaResponseStateModel } from 'src/state/plantillaResponseStateModel';
import { Injectable } from '@angular/core';



@State<PlantillaResponseStateModel<RutinaDTO>>({
    name: 'Rutina',
    defaults:{
     plantillaResponse:null
    }
  })
  @Injectable()
 export class RutinaState{
  

    constructor(private readonly rutinaSvc:RutinasService ){}
    
    @Selector()
    public static getAllRutinas({plantillaResponse}:PlantillaResponseStateModel<RutinaDTO>){
      return plantillaResponse;
    }

    @Action(getAllRutinas)
    getAllRutinas({ getState, setState}: StateContext<PlantillaResponseStateModel<RutinaDTO>>
     ) {
        return this.rutinaSvc.all().subscribe(
          res=>{
           debugger;
         let plantillaResponse:PlantillaResponse<RutinaDTO>= res;
           
             const state = getState();
             setState({ ...state, plantillaResponse })
             
            });
}
 }