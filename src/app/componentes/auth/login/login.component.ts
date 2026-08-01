import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormsAuthService } from 'src/app/core/servicios/formularios/forms-auth.service';
import { AuthService } from 'lib-common-angular';
import { LoginDTO } from '@juliaosistem/core-dtos';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {

  formLogin: UntypedFormGroup;
  loading = false;
  errorMsg: string | null = null;

  constructor(private formAuthSvc :FormsAuthService, private authService: AuthService) { }

  ngOnInit() {
    this.buildForms();
  }

  buildForms(){
    this.formLogin =this.formAuthSvc.buildFormLogin(this.formLogin)
   }  

  login(){
    const payload = this.buildLoginPayload();
    this.loading = true;
    this.errorMsg = null;

    this.authService.login(payload).subscribe({
      next: (result) => {
        this.loading = false;
        if (!result.success) {
          this.errorMsg = result.errorMsg ?? 'Credenciales inválidas';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.errorMsg || 'Error de autenticación';
      },
    });
  }

  private buildLoginPayload(): LoginDTO {
    const email = this.formLogin?.value?.nickname?.trim();
    const password = this.formLogin?.value?.password;
    return { email, password } as LoginDTO;
  }
}
