import { ProductVO } from './../../../core/modelos/productos/productVO';
import { ProductState } from 'src/state/productos.state ';
import { Component, OnInit } from '@angular/core';
import { Select, Store, } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { getProducts } from 'src/state/productos.actions';
import { isEmpty } from 'rxjs';


@Component({
    selector: 'app-card-padre',
    templateUrl: './card-padre.component.html',
    styleUrls: ['./card-padre.component.scss'],
    standalone: false
})
export class CardPadreComponent implements OnInit {

  @Select(ProductState.getProducts) products$:Observable<ProductVO[]>;
   public isEmptyProduct :boolean = true;
  
  constructor(  private store : Store) { }

  ngOnInit() {
    try {
      this.store.dispatch(new getProducts(1));
     
   
      this.products$.subscribe(res=>{
        console.log(res);
        (res.length != 0)?this.isEmptyProduct = false:this.isEmptyProduct=true;
        console.log(this.isEmptyProduct)
        
      })
    } catch (error) {
       console.log(error);
    }
  
  }

}
