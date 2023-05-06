import { UserVO } from 'src/app/core/modelos/Usuarios/UserVO.Model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';




export  class JuliaoSystemCrudHttpService<T> {
    protected http: HttpClient;
    basePathUrl: string;
    
  
    constructor(http: HttpClient){};
    findByName(itemId:string){
 
    };
    findByIdBussines(idBussines: number ):Observable<T[]>{

        return this.http.get<T[]>(this.basePathUrl+"/all/"+idBussines,{},);
    }

    add(entidad: T){
        
        return  this.http.post(this.basePathUrl+"/add",entidad,{});
        
    };

    findById(id:number):Observable<T>{
        return this.http.get<T>(this.basePathUrl+"/findById/"+id,{});

    }
   
   
  //  remove(itemId: number): Promise<boolean>;
   // static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<JuliaoSystemCrudHttpService<any>, never>;
}