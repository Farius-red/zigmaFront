import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { 
    
  }

  ngOnInit() {}
 

  touchRedes(red: string) {
    if(this.router.url == "/inicio/ecu"){
    if(red=="whatsapp") window.open("https://wa.link/t4l0z0", '_blank');
    if(red=="facebook")window.open("https://www.facebook.com/ZigmainflablesEcuador/",'_blank' );
    if(red=="instagram")window.open("https://www.instagram.com/fabricantesdeinflableszigma/",'_blank' );
    }
    else{
     if(red=="whatsapp")window.open("https://wa.link/xsdfdu",'_blank' );
     if(red=="facebook")window.open("https://www.facebook.com/Zigmainflables/",'_blank' );
     if(red=="instagram")window.open("https://www.instagram.com/zigmainflables/",'_blank' );
    }
     }

}
