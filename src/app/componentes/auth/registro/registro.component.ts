import { AddUsuario } from './../../../../state/usuarios.actions';
import { DatesUser } from './../../../core/modelos/Usuarios/UserVO.Model';
import { UserVO } from 'src/app/core/modelos/Usuarios/UserVO.Model';
import { FormsAuthService } from './../../../core/servicios/formularios/forms-auth.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormGroupName } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

   formRegisterU: UntypedFormGroup;

  constructor(private formAuthSvc :FormsAuthService,  private store : Store) {
    
   }

  ngOnInit() {
    this.buildForms();
  }

 buildForms(){
  this.formRegisterU =this.formAuthSvc.buildFormRegister(this.formRegisterU)
 } 
 
 generateidUrl(longitud:number):string{
      let letras = "aBcDEiHjkLnoPkrSuVzyIAbOpQsTNi";
      let numeros= "1234567890";
      let cadena = letras+numeros;
      let idUrl ="";
      for (let index = 0; index < longitud; index++) {
        let aleatorio = Math.floor(Math.random() * cadena.length);
        idUrl += cadena.charAt(aleatorio);
      }
      return idUrl;
 }
 catchDatesForm():UserVO{
  let datesForm : UserVO;
  if(this.formRegisterU.valid){
   let hoy = new Date();
  let datesUser : DatesUser= {
    idDateUser: 0,
    firsName:  this.formRegisterU.get('nombres').value,
    firsLastName: this.formRegisterU.get('apellidos').value,
    phone: this.formRegisterU.get('telefono').value,
    address: undefined
  }
     datesForm = {
       idUser: '',
       username: this.formRegisterU.get('nickname').value ,
       password:  this.formRegisterU.get('password').value,
       idUrl: this.formRegisterU.get('nickname').value+this.generateidUrl(5),
       balance: 0,
       email: this.formRegisterU.get('email').value,
       createDate: hoy.toDateString(),
       creator: this.formRegisterU.get('nickname').value,
       idBussines: 1,
       updateDate: hoy.toLocaleDateString(),
       token: undefined,
       state: undefined,
       dateUser: datesUser,
       idRol: []
     }
    }

    return datesForm
 }

 add(){

  if(this.formRegisterU.valid)
  console.log(this.catchDatesForm());
    this.store.dispatch(new AddUsuario(this.catchDatesForm()));
 }
}
