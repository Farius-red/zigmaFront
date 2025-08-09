import { PlantillaResponse } from 'src/app/core/modelos/PlantillaResponse';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RutinaState } from 'src/state/logicanegocio/wellnesfit/rutina.state';
import { RutinaDTO } from 'src/app/core/modelos/logicaNegocio/wellnesfit/RutinaDTO.model';
import { getAllRutinas } from 'src/state/logicanegocio/wellnesfit/rutina.actions';
import { PersonalizacionTabla, PlantillaTablas } from 'src/app/core/modelos/plantillas/PlantillaTablas';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Comida } from 'src/app/core/modelos/logicaNegocio/wellnesfit/Comida.model';
import { Ejercicio } from 'src/app/core/modelos/logicaNegocio/wellnesfit/Ejercicio.model';

@Component({
  selector: 'app-lista-rutinas',
  templateUrl: './lista-rutinas.component.html',
  styleUrls: ['./lista-rutinas.component.scss'],
})
export class ListaRutinasComponent implements OnInit {

  @Select(RutinaState.getAllRutinas) rutinas$:Observable<PlantillaResponse<RutinaDTO>>;

  plantillaTablas: PlantillaTablas<RutinaDTO> = new PlantillaTablas<RutinaDTO>();
  plantillaResponse: PlantillaResponse<RutinaDTO>=  new PlantillaResponse<RutinaDTO>();

  listComidasDataTabla: PlantillaTablas<Comida>= new PlantillaTablas<Comida>();
  listComidasDataResponse: PlantillaResponse<Comida> = new PlantillaResponse<Comida>();
  listEjerciciosDataTabla: PlantillaTablas<Ejercicio>= new PlantillaTablas<Ejercicio>();
  listEjerciciosDataResponse: PlantillaResponse<Ejercicio>= new PlantillaResponse<Ejercicio>();



  constructor(private store :Store) { }

  ngOnInit() {
    this.store.dispatch(new getAllRutinas() )
    this.rutinas$.subscribe(rutinaDTO=> {
      console.log(rutinaDTO);
      this.construirTablas(rutinaDTO);
    
    });
    
  }

  crearTablaEjercicio(rutinaDTO:RutinaDTO){
    let ejercicioDataTabla: PlantillaTablas<Ejercicio>;
    ejercicioDataTabla.sizeDatos=rutinaDTO.ejercicios.length;
    ejercicioDataTabla.pageSize=5;
    ejercicioDataTabla.displayedColumns=["nombreEjercicio","serie","repeticiones","urlImagen","acciones"]
    ejercicioDataTabla.personalizacionTabla =  new PersonalizacionTabla();
    ejercicioDataTabla. personalizacionTabla.isAdd=true;
    ejercicioDataTabla.personalizacionTabla.isDelete=true;
    ejercicioDataTabla.personalizacionTabla.isUpdate=true;
    ejercicioDataTabla.personalizacionTabla.isExcel=false;
    ejercicioDataTabla.personalizacionTabla.isPDF=false;
    ejercicioDataTabla.personalizacionTabla.isSeeMore=false
    ejercicioDataTabla.dataSource= new MatTableDataSource(rutinaDTO.ejercicios)
    return ejercicioDataTabla;
  }

construirTablas(rutinaDTO:PlantillaResponse<RutinaDTO>){
  this.plantillaResponse= rutinaDTO;
  if(rutinaDTO?.dataList?.length>0){
       rutinaDTO.dataList.forEach(e=> {
        if (e?.ejercicios?.length){this.listEjerciciosDataTabla=this.crearTablaEjercicio(e)}
      })
      console.log("DEsde construir tablas",this.listEjerciciosDataTabla);
      console.log("desde construir tablas", this.listEjerciciosDataResponse);
  }
}
  asignarDatosTabla(rutinaDTO:PlantillaResponse<RutinaDTO> ){
   
    this.plantillaResponse= rutinaDTO;
    this.plantillaTablas.pageSize =1;
    this.plantillaTablas.displayedColumns = ["hora","descripcion","idUrl"];
    this.plantillaTablas.sizeDatos= rutinaDTO?.dataList?.length || 0;
    this.plantillaTablas.personalizacionTabla= new PersonalizacionTabla();
    this.plantillaTablas.personalizacionTabla.isAdd=true;
    this.plantillaTablas.personalizacionTabla.isDelete=true;
    this.plantillaTablas.personalizacionTabla.isUpdate=true;
    this.plantillaTablas.dataSource= new MatTableDataSource(rutinaDTO?.dataList)
  }


}
