
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductVO } from 'src/app/core/modelos/productos/productVO';

@Component({
    selector: 'app-card-products',
    templateUrl: './card-products.component.html',
    styleUrls: ['./card-products.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CardProductsComponent implements OnInit {
@Input()  product: ProductVO

  constructor() { }

  ngOnInit() {}

}
