import { ProductVO } from './../app/core/modelos/productos/productVO';

export class getProducts {
  static readonly type = '[ProductVO] GET';
  constructor(public payload:number){}
}


export class UpdateProduct {
  static readonly type = '[ProductVO] update';
  constructor(public payload:string){}
}



export class AddProduct {
  static readonly type = '[ProductVO] Add ';
  constructor(public payload: ProductVO) { }
}




export class DeleteProduct{
  static readonly type = '[ProductVO] delete'
  constructor(public id: string) {}
    
  }