import { loginUsuario } from "src/app/core/modelos/Usuarios/loginUsuario.Model";
import { UserVO } from "src/app/core/modelos/Usuarios/UserVO.Model";


export class AddUsuario {
  static readonly type = '[Usuarios] Add ';
  constructor(public payload: UserVO) { }
}

export class UpdateUsuario{
  static readonly type = '[Usuarios] update'
  constructor(public payload : UserVO){}
}

export class GetToken{
  static readonly type= '[Usuarios] getToken'
  constructor(public loginUsuario : loginUsuario){}
}

export class Token{
  static readonly type= '[Usuarios] Token'  
}
export class GetUsuario{
  static readonly type= '[Usuarios] get'
}

export class DeleteUsuario{
  static readonly type = '[Usuarios] delete'
  constructor(public id: string) {
    
  }
}