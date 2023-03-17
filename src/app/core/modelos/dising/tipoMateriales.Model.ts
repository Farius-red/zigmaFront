import { ColoresModel } from "./colores.Model";

export interface TipoMaterialesModel {
 
    id_material: number,
    id_colores: ColoresModel[],
    descripcion:string

}