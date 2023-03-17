import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsAuthService } from 'src/app/core/servicios/formularios/forms-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  constructor(private formAuthSvc :FormsAuthService) { }

  ngOnInit() {
    this.buildForms();
  }

  buildForms(){
    this.formLogin =this.formAuthSvc.buildFormLogin(this.formLogin)
   }  

  login(){
    console.log(this.formLogin.value);
  }
}
