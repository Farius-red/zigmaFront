import { Observable } from "rxjs";

export class PlantillaResponse<E>{
    isRta?:boolean;
    message?:string;
    httpStatus?:number;
    data?:E;
    dataList?:E[];
    dataFlux?:Observable<object>;
    dataMono?:Observable<object>;
    

}