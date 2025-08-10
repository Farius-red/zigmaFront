
import { MatTableDataSource } from "@angular/material/table";

export class PlantillaTablas<E>{
    personalizacionTabla:PersonalizacionTabla;
    pageSize: number;
    sizeDatos :number;
    displayedColumns: string[] ;
    dataSource: MatTableDataSource <E>;
}

export class PersonalizacionTabla{
    isExcel:boolean;
    isPDF:boolean;
    isUpdate:boolean;
    isCreate:boolean;
    isDelete:boolean;
    isAdd:boolean;
    isSeeMore:boolean;
}