import { ProductVO } from 'src/app/core/modelos/productos/productVO';

import { Observable, } from 'rxjs';
import { MenuSvcService } from './../../core/servicios/menuSvc/menu-svc.service';
import { Component, OnInit,  } from '@angular/core';
import { MenuModel } from 'src/app/core/modelos/menu/menu.Model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  menuId:string = "inicio"
  menu:Observable<MenuModel[]>

  productosVO:ProductVO[]=[
    {
    idProduct:"Tobogan Lego",idBussines: 1, idCategorie: "2", name:"Tobogan Lego",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con un resbaladero , una escalera , una zona de brinco bastante amplia con golpeadores ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/Tobogan-inflable-lego.jpg",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 5.5 mts alto x 7 mts fondo  x 4.5 mts ancho"
  },

  {
    idProduct:"Mini Tobogan BOB",idBussines: 1, idCategorie: "2", name:"Mini Tobogan BOB",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con doble resbaladero , una escalera central  y una zona de brinco",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/miniTobogan bob-min .jpg",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 4.5 mts alto x 5 mts fondo  x 4 mts ancho"
  },

  {
    idProduct:"Tobogan Barco",idBussines: 1, idCategorie: "2", name:"Mini Tobogan BOB",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con doble resbaladero , una escalera central  y una zona de brinco con mastil en el centro",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/barco.jpg",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 5.4 mts alto x 6 mts fondo  x 4.5 mts ancho"
  },
  {
    idProduct:"Mini Tobogan Marvel",idBussines: 1, idCategorie: "2", name:"Mini Tobogan Marvel",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con doble resbaladero , una escalera central  y una zona de brinco",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/miniToboganMarvel.jpg",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 4.5 mts alto x 5 mts fondo  x 4 mts ancho"
  },

 

]

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
    private router: Router
    ) { }

  ngOnInit() {
      console.log(this.router.url)
  }

  moverSlideAdelante(){
  }

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
