import { RegistroTrabajosComponent } from './../modales/registro-trabajos/registro-trabajos.component';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'app-lista-trabajos',
    templateUrl: './lista-trabajos.component.html',
    styleUrls: ['./lista-trabajos.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ListaTrabajosComponent implements OnInit {
  component = RegistroTrabajosComponent
  constructor() { }

  ngOnInit() {}


}
