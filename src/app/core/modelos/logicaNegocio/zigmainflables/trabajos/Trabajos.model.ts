import { InflablesDisingModel } from "../dising/inflablesDising.Model";

export interface TrabajosModel{
    id:number;
    trabajo:InflablesDisingModel[];
    estado: number;
    imagen:string;
    fechaInicio:string;
    fechaFinal:string;
    idUser:number;
}