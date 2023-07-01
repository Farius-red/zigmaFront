import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddWorkAction, getTrabajos } from './lisworks.actions';
import { TrabajosModel } from 'src/app/core/modelos/logicaNegocio/zigmainflables/trabajos/Trabajos.model';

export class LisworksStateModel {
  public works: TrabajosModel[];
}



@State<LisworksStateModel>({
  name: 'lisworks',
  defaults:{
    works:[],
  }
})
@Injectable()
export class LisworksState {

  constructor( ){}
  
  @Selector()
  public static getWorkslist({works}: LisworksStateModel){
    return works;
  }
  
  @Action(AddWorkAction)
  add({ getState, setState }: StateContext<LisworksStateModel>, { payload }: AddWorkAction) {
    const state = getState();
    setState({ works: [ ...state.works, payload ] });
  }


  @Action(getTrabajos)
  getDising({ getState, setState}: StateContext<LisworksStateModel>) {
      // return this.disingSvc.getMenu().subscribe(
      //   res=>{
        
         
      //      const state = getState();
      //      setState({ ...state, disings })
           
      //     });
}
 

}
