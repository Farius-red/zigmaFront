import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-card-tablas',
    templateUrl: './card-tablas.component.html',
    styleUrls: ['./card-tablas.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CardTablasComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
