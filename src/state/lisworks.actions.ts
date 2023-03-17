import { TrabajosModel } from './../app/core/modelos/trabajos/Trabajos.model';
export class AddWorkAction {
  static readonly type = '[Lisworks] Add work';
  constructor(public payload: TrabajosModel) { }
}

export class getTrabajos{
  static readonly type = '[Lisworks] get works';

}