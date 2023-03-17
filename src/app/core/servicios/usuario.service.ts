import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginUsuario } from '../modelos/Usuarios/loginUsuario.Model';
import { UserVO } from '../modelos/Usuarios/UserVO.Model';
import { JuliaoSystemCrudHttpService } from './crud/juliaoSystemCrudHttpService';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends JuliaoSystemCrudHttpService<UserVO> {
  


  constructor(
    protected http: HttpClient,
  ) {
    super(http);
    this.basePathUrl = environment.baseUrlUsuarios+"/user";
  }

  getToken(longinUser: loginUsuario ):Observable<string>{
 
    return  this.http.post<string>(this.basePathUrl+"/generate-token/",longinUser,{});
};
  

  
getCurrentUser():Observable<UserVO>{

 
  return  this.http.get<UserVO>(this.basePathUrl+"/get-user-log",{},);
};

}
