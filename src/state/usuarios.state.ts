
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddUsuario, GetToken, GetUsuario,} from './usuarios.actions';
import { UsuarioService } from 'src/app/core/servicios/usuario.service';
import { UserVO } from 'src/app/core/modelos/Usuarios/UserVO.Model';
import { JwtVO } from 'src/app/core/modelos/Usuarios/jwtVO.Model';

export class UsuariosStateModel {
  public usuarios: UserVO[]=[];
  public currentUser:UserVO;
  
  public token:JwtVO
}

const defaults = {
  usuarios: [],
  currentUser:null,
  token:null,
  usuarioSelecccionado: null
};

@State<UsuariosStateModel>({
  name: 'usuarios',
  defaults
})

@Injectable()
export class UsuariosState {
  constructor(private readonly usuServi :UsuarioService){}

  @Selector()
  public static getListUsuarios({usuarios}:UsuariosStateModel): UserVO[]{
    return usuarios
  }

  
@Selector()
public static getCurrentUser(currentUser:UserVO){
  return currentUser;
}

  @Selector()
  public static token(state:UsuariosStateModel){
    return state.token;
  }


@Action(GetToken)
getToken({ getState, setState}: StateContext<UsuariosStateModel>, 
  { loginUsuario }: GetToken) {
    return this.usuServi.getToken(loginUsuario).subscribe((res) => {
       let token:JwtVO;
       token.token=res;
        const state = getState();
        setState({ ...state,token})
    
    })
     
}

@Action(GetUsuario)
getCurrentUser({ getState, setState}: StateContext<UsuariosStateModel> ) {
    return this.usuServi.getCurrentUser().subscribe((res) => {
       let currentUser:UserVO = res;
        const state = getState();
        setState({ ...state,currentUser})
    
    })
     
}

  @Selector()
  public static usuarioSeleccionado({usuarioSelecccionado}): UserVO[]{
    return usuarioSelecccionado
  }

  @Action(AddUsuario)
  addBook(
    { getState, patchState }: StateContext<UsuariosStateModel>,
    { payload }: AddUsuario
  ) {
    return this.usuServi.add(payload).subscribe((result) => {
      const state = getState();
      patchState({
        // books: [...state.books, book],
        usuarios: [...state.usuarios, ],
      });
    })
     
    
  }

}
