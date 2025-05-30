
import { getDising, getColoresyMateriales } from './disenio.actions';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { InflablesDisingModel } from 'src/app/core/modelos/logicaNegocio/zigmainflables/dising/inflablesDising.Model';
import { TipoMaterialesModel } from 'src/app/core/modelos/logicaNegocio/zigmainflables/dising/tipoMateriales.Model';
import { DisingsvcService } from 'src/app/core/servicios/logicaNegocio/zigmainflables/disingSVC/disingsvc.service';


export class InflablesDisingStateModel {
  public disings: InflablesDisingModel[]=[];
  public materialyColores: TipoMaterialesModel []= [];
}
@State<InflablesDisingStateModel>({
    name: 'Dising',
    defaults:{
     disings: [],
     materialyColores:[],
    }
  })
  
  @Injectable()
  export class disenioState{
  
  constructor(private readonly disingSvc:DisingsvcService ){}
  
  @Selector()
  public static getDisingslist({disings}:InflablesDisingStateModel){
    return disings;
  }
  
  @Selector()
  public static getColoresYMateriales({materialyColores}:InflablesDisingStateModel){
    return materialyColores;
  }
  
    @Action(getDising)
    getDising({ getState, setState}: StateContext<InflablesDisingStateModel>, 
      { payload }: getDising) {
        return this.disingSvc.getMenu().subscribe(
          res=>{
           debugger;
         let disings:InflablesDisingModel[]= res;
           
             const state = getState();
             setState({ ...state, disings })
             
            });
  }
   

  @Action(getColoresyMateriales)
  getColoresYMareriales({getState, setState}:StateContext<InflablesDisingStateModel>){
    return this.disingSvc.getColoresYMateriales().subscribe(
      res=>{
        let materialyColores:TipoMaterialesModel [] = res;
         const state = getState();
         setState({...state, materialyColores})
      
      });
    
  }
  
  }
  