import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormsAuthService } from 'src/app/core/servicios/formularios/forms-auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {

  formLogin: UntypedFormGroup;
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
