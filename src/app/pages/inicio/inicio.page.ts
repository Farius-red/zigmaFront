
import { Observable, delay } from 'rxjs';
import { MenuSvcService } from './../../core/servicios/menuSvc/menu-svc.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuModel } from 'src/app/core/modelos/menu/menu.Model';
import { Navigation } from "swiper";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  menuId:string = "inicio"
  menu:Observable<MenuModel[]>

  imagenes = [{
    src: '../../../assets/imagenes/banerProductosRecreativos.jpg',
    alt: 'zigma inflables banner 1'
  },
  {
    src: '../../../assets/imagenes/banner2.png',
    alt: 'zigma inflables banner 2'
  },
  {
    src: '../../../assets/imagenes/banner4.jpg',
    alt: 'zigma inflables banner 3 '
  },

  {
    src: '../../../assets/imagenes/banerZigma5.jpg',
    alt: 'zigma inflables banner 4 '
  },
 {
  src: '../../../assets/imagenes/bannerZigma6.jpg',
    alt: 'zigma inflables banner 5 '
 }
  
  
]

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true ,
    autoplay:{
      delay: 4000
    }
  };

  constructor(private  menuSvc: MenuSvcService ,

    ) { }

  ngOnInit() {
     
  }

  moverSlideAdelante(){
  }
	
  
}
