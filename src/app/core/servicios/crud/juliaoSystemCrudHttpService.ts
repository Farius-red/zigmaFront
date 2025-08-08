import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';




export  class JuliaoSystemCrudHttpService<E> {
    protected http: HttpClient;
    basePathUrl: string;
    
  
    constructor(http: HttpClient){};
    findByName(itemId:string){
 
    };
    findByIdBussines(idBussines: number ):Observable<E[]>{

        return this.http.get<E[]>(this.basePathUrl+"/all/"+idBussines,{},);
    }

    add(entidad: E){
        
        return  this.http.post(this.basePathUrl+"/add",entidad,{});
        
    };

    findById(id:number):Observable<E>{
        return this.http.get<E>(this.basePathUrl+"/findById/"+id,{});

    }

    all():Observable<E>{
        return this.http.get<E>(this.basePathUrl+"all/");
    }
   
   
  //  remove(itemId: number): Promise<boolean>;
   // static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<JuliaoSystemCrudHttpService<any>, never>;
}