import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login-tab',
    templateUrl: './login-tab.page.html',
    styleUrls: ['./login-tab.page.scss'],
    standalone: false
})
export class LoginTabPage implements OnInit {
 menuId:string = "inicio"
  constructor() { }

  ngOnInit() {
  }

}
