import { PlantillaResponse } from './../../../core/modelos/PlantillaResponse';
import { PlantillaTablas } from './../../../core/modelos/plantillas/PlantillaTablas';
import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';

import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-tabla-padre',
  templateUrl: './tabla-padre.component.html',
  styleUrls: ['./tabla-padre.component.scss'],
})
export class TablaPadreComponent<E> implements OnInit {

  @Input() plantillaTablas:PlantillaTablas<E>;
  @Input()plantillaResponse: PlantillaResponse<E>;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { 

    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    console.log(this.plantillaResponse)
    console.log(this.plantillaTablas)
    
    setTimeout(()=>{

      this.plantillaTablas.dataSource = new MatTableDataSource(this.plantillaResponse.dataList);
    });
  }

  ngOnInit() {
    console.log(this.plantillaResponse)
    console.log(this.plantillaTablas)
  }


  ngAfterViewInit() {
    console.log(this.plantillaResponse)
    console.log(this.plantillaTablas)
    setTimeout(() => {
      this.plantillaTablas.dataSource.paginator = this.paginator;
      this.plantillaTablas.dataSource.sort = this.sort;
    });


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.plantillaTablas.dataSource.filter = filterValue.trim().toLowerCase();

    if ( this.plantillaTablas.dataSource.paginator) {
       this.plantillaTablas.dataSource.paginator.firstPage();
    }
  }

  update(){}
  whatsapp(){}
  importCvc($prueba){
    let file = $prueba.target.files[0];
    if (file) {
      let formData= new FormData();
      formData.append('file',file)
     console.log(formData );
    }

  }
  delete(){}
  add(){}

  verMas(){}
}


