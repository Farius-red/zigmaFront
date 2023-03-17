import { ProductVO } from './../app/core/modelos/productos/productVO';
import { getProducts } from './productos.actions';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ProductService } from 'src/app/core/servicios/product/product.service';




export class ProductosStateModel {
  public products: ProductVO[]=[];
}

@State<ProductosStateModel>({
  name: 'product',
  defaults:{
   products:[]  
},
})

@Injectable()
export class ProductState {

constructor(private readonly productSvc: ProductService ){}

@Selector()
public static getProducts(productVO:ProductVO){
  return productVO;
}


  @Action(getProducts)
  getProductos({ getState, setState}: StateContext<ProductosStateModel>, 
    { payload }: getProducts) {
      return this.productSvc.findByIdBussines(payload).subscribe((res) => {
         let products:ProductVO[] = res;
          const state = getState();
          setState({ ...state,products})
      
      })
          
}
 

}
