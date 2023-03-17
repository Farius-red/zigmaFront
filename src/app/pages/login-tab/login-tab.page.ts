import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-tab',
  templateUrl: './login-tab.page.html',
  styleUrls: ['./login-tab.page.scss'],
})
export class LoginTabPage implements OnInit {
 menuId:string = "inicio"
  constructor() { }

  ngOnInit() {
  }

}
