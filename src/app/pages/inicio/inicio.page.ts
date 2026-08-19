import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { MenuModel } from 'src/app/core/modelos/menu/menu.Model';
import { Router } from '@angular/router';
import { BusinessDTO, CategoriaDTO, ProductoDTO} from '@juliaosistem/core-dtos';
import { Store } from '@ngxs/store';
import { ProductosActions,CategoriaproductoActions, ProductService, AuthService} from 'lib-common-angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
    standalone: false
})
export class InicioPage implements OnInit ,OnDestroy{

  // Datos para pasar a los componentes

  categorias: CategoriaDTO[]=[];
  isLogin: boolean = false;
  loading: boolean = true;
  private destroy$ = new Subject<void>();
  bussinesDTO: BusinessDTO ={
    idBussines: 1,
    nombreNegocio: "Zigma Inflables",
    logo: "../../../assets/imagenes/logozigmainflables2.svg",
    email: "zigmainflables.com",
    businessModule: [],
    urlWhatssapp: "https://tinyurl.com/zigmainflables",
    direccion:  "Carrera 104 # 130a -06 bogota ",
    lenguaje: "ES",
    productos: [],
    telefono: "3118025433",
    googleAnalyticsEvent: "cotizar",
    googleAdsConversionId: "AW-17894779083"
  }

  menuId:string = "inicio"
  menu: Observable<MenuModel[]> | undefined;



  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true ,
    autoplay:{
      delay: 4000
    }
  };
  

  constructor(
    private router: Router,
    private store: Store,
    private productSvc: ProductService,
    private authService: AuthService,
    ) { }

  ngOnInit() {
      console.log(this.router.url)
      this.authService.rehydrateSession();
      this.authService.isLoggedIn$
        .pipe(takeUntil(this.destroy$))
        .subscribe((isLogged) => this.isLogin = isLogged);
      this.loadData();
      }

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
  }

  private loadData() {
    this.store.dispatch([
      new ProductosActions.All({} as any),
      new CategoriaproductoActions.All({} as any),
    ]);

      this.store.select((state) => state.categoriaproducto?.dataList)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: CategoriaDTO[]) => {
        console.log('Categorías cargadas desde backend:', data);
        this.categorias = data ?? [];
        this.checkLoadingComplete();
      });
    this.store
      .select((state) => state.producto?.dataList)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ProductoDTO[]) => {
        console.log('Productos cargados desde backend:', data);
        this.bussinesDTO.productos = data ?? [];
        this.checkLoadingComplete();
      });
    }

  private checkLoadingComplete() {
    if (this.bussinesDTO.productos && this.categorias) {
        this.bussinesDTO.productos = this.productSvc.addNameCategoriaToProducts(
          [...this.bussinesDTO.productos],
          this.categorias,
        );
        this.loading = false;
    }
    }
	touchRedes(red: string) {
 
   
    if(red=="whatsapp")window.open("https://wa.link/xsdfdu",'_blank' );
    if(red=="facebook")window.open("https://www.facebook.com/Zigmainflables/",'_blank' );
    if(red=="instagram")window.open("https://www.instagram.com/zigmainflables/",'_blank' );
   
  }
  
}
