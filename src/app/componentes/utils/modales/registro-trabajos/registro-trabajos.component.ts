
import { TipoMaterialesModel } from '../../../../core/modelos/logicaNegocio/zigmainflables/dising/tipoMateriales.Model';
import { InflablesDisingModel } from '../../../../core/modelos/logicaNegocio/zigmainflables/dising/inflablesDising.Model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColoresModel } from 'src/app/core/modelos/logicaNegocio/zigmainflables/dising/colores.Model';
import { getColoresyMateriales, getDising } from 'src/state/logicanegocio/zigmainflables/disenio.actions';
import { disenioState } from 'src/state/logicanegocio/zigmainflables/disenios.state';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}


@Component({
    selector: 'app-registro-trabajos',
    templateUrl: './registro-trabajos.component.html',
    styleUrls: ['./registro-trabajos.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true },
        },
    ],
    standalone: false
})


export class RegistroTrabajosComponent implements OnInit,  AfterViewInit {


public pageSize: number;
public  sizeDatos :number;
 
    
  displayedColumns: string[] = [ 'nombrePieza', 'cantidad', 'color'];
  dataSource: MatTableDataSource <InflablesDisingModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


name = '';
@Select(disenioState.getDisingslist) disenio$:Observable<InflablesDisingModel[]>;
@Select(disenioState.getColoresYMateriales) coloresyMateriales$:Observable<TipoMaterialesModel[]>;
public envioColor :InflablesDisingModel[] =[];
public filtroColores$: Observable<ColoresModel[]> ;
colorSeleccionado:string;

stepperOrientation: Observable<StepperOrientation>;
worksFormGroup = this._formBuilder.group({
  dising: ['', Validators.required],
  picesAndColors: [[], Validators.required],
  messageAdd:[''],

});

  isLinear = true;


  constructor(private modalCtrl: ModalController, 
    private _formBuilder: UntypedFormBuilder,
    private breakpointObserver: BreakpointObserver,
    private store : Store
    ) { 

      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
     

    
    }
    ngAfterViewInit() {
     
    }

  ngOnInit() {
    this.store.dispatch(new getColoresyMateriales());
    

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this.worksFormGroup.value);
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  selectDising() {
    
   this.store.dispatch(new getDising(this.worksFormGroup.get('dising').value));
   this.disenio$.subscribe(res=>{ 
    this.dataSource  =  new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sizeDatos = this.dataSource.data.length;
  });
  if(this.dataSource.data.length!=0){
     this.dataSource.data.forEach(e => this.filtrarColorPorMaterial(e))
  }
  
    }

    applyFilter(event: Event) {   
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    filtrarColorPorMaterial(color: InflablesDisingModel) {
     this.filtroColores$ = new Observable(sub =>{
       this.coloresyMateriales$.subscribe(res =>{
       let materiales  = res.filter(e => e.id_material === color.material);
        sub.next(materiales[0].id_colores )})
      })
   }

   buscarPiezasEnLista(){
    this.disenio$.subscribe(res =>{
      this.envioColor.forEach(element => {
        let indice =  res.findIndex(e => e.nombrePieza == element.nombrePieza);
       res.splice(indice,1,element);
      });
      this.worksFormGroup.controls['picesAndColors'].setValue(res)
       console.log(this.worksFormGroup.value);
      
    })
   }
   updateColor(color:any, row: InflablesDisingModel) {
    debugger;
      row.color = color.target.innerText;
      this.envioColor.push(row);
      
      this.worksFormGroup.controls['picesAndColors'].setValue(this.envioColor);
   
      
    }

}
