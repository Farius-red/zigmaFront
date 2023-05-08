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
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/Tobogan-inflable-lego.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 5.5 mts alto x 7 mts fondo  x 4.5 mts ancho"
  },
  {
    idProduct:"Tobogan Mario",idBussines: 1, idCategorie: "2", name:"Tobogan Mario",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con 2 resbaladero , una escalera   y una zona de brinco  ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/ToboganMarioBros.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 5 mts alto x 6 mts fondo  x 4.5mts ancho"
  },

  {
    idProduct:"Mini Tobogan Toy Story",idBussines: 1, idCategorie: "2", name:"Mini Tobogan Toy Story",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con doble resbaladero , una escalera central  y una zona de brinco",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/miniTobogan2.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 4.5 mts alto x 5 mts fondo  x 4 mts ancho"
  },
  {
    idProduct:"Mini Tobogan Mixto",idBussines: 1, idCategorie: "2", name:"Mini Tobogan Mixto",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con doble resbaladero , una escalera central  y una zona de brinco",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/ToboganMixto.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 4.5 mts alto x 5 mts fondo  x 4 mts ancho"
  },
  {
    idProduct:"Tobogan BART",idBussines: 1, idCategorie: "2", name:"Tobogan BART",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con doble resbaladero , una escalera   y una zona de brinco",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/Tobogan BART.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 4.5 mts alto x 5,5 mts fondo  x 6 mts ancho"
  },

  {
    idProduct:"Tobogan Zony 2.0",idBussines: 1, idCategorie: "2", name:"Tobogan Zony 2.0",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con doble resbaladero , una escalera   y una zona de brinco",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/Tobogan sony 2.0.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 4.5 mts alto x 5,5 mts fondo  x 6 mts ancho"
  },
 
   {
    idProduct:"Botella Publicitaria",idBussines: 1, idCategorie: "2", name:"Botella Publicitaria",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con  resbaladero , una escalera central  y una zona de brinco ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/publicitarioBotella.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas segun se escoja "
  },
  {
    idProduct:"Arco Publicitario ",idBussines: 1, idCategorie: "2", name:"Arco Publicitario ",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con  resbaladero , una escalera central  y una zona de brinco ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/arco publicitario.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas segun se escoja "
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
    idProduct:"Mini Tobogan Marvel 2.0",idBussines: 1, idCategorie: "2", name:"Mini Tobogan Marvel 2.0",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con 4 resbaladeros , una escalera central  y una zona de brinco con tunel ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/toboganMarvel2.0.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 3.7 mts alto x 6 mts fondo  x 4.5 mts ancho"
  },
  {
    idProduct:"Tobogan Tiburon",idBussines: 1, idCategorie: "2", name:"Tobogan Tiburon",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con 2 resbaladeros , una escalera central  y una zona de brinco ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/tiburon.jpg",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 4.5 mts alto x 6 mts fondo  x 5 mts ancho"
  },

  {
    idProduct:"Tobogan Jungla",idBussines: 1, idCategorie: "2", name:"Tobogan Jungla",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con 1 resbaladero , una escalera   y una zona de brinco  ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/jungla.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 6 mts alto x 5 mts fondo  x 6 mts ancho"
  },
  {
    idProduct:"Hipopotamo",idBussines: 1, idCategorie: "2", name:"Hipopótamo",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con  resbaladero , una escalera central  y una zona de brinco ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/hipopotamoinflable.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 3 mts alto x 4.5 mts fondo  x 5.5 mts ancho"
  },
  {
    idProduct:"Cocodrillo 1.0",idBussines: 1, idCategorie: "2", name:"Cocodrillo 1.0",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con 1 resbaladero , una escalera   y una zona de brinco  ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/cocodrilloInflable.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 2.5 mts alto x 4 mts fondo  x 4 mts ancho"
  },
  {
    idProduct:"Castillo 1.0",idBussines: 1, idCategorie: "2", name:"Castillo 1.0",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con 1 resbaladero    y una zona de brinco  ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/castillomini1.0.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 2.5 mts alto x 3 mts fondo  x 3 mts ancho"
  },

  {
    idProduct:"Castillo Pat-patrol",idBussines: 1, idCategorie: "2", name:"Castillo Pat-patrol",
    price_cop:0,price_usd:0, amount:2,
    description:"Cuenta con 1 resbaladero    y una zona de brinco  ",
    ulrProduct:"../../../assets/imagenes/inflables/productos/mini/pat-patrol.JPG",
    state:1,country:1 ,creator:"Zigma inflables",
    medidas:"Medidas 3.2 mts alto x 4 mts fondo  x 4 mts ancho"
  },

 


]

  imagenes = [{
    src: '../../../assets/imagenes/banerZigmainflables1.jpg',
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
