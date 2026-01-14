import { MenuModel } from './core/modelos/menu/menu.Model';
import { MenuState } from 'src/state/menu.state';
import { getMenu } from './../state/menu.actions';
import { Component } from '@angular/core';
import {   TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

import {  Router } from '@angular/router';
import { ProductosState } from 'lib-common-angular';
import { ProductoDTO } from '@juliaosistem/core-dtos';
import { Select,  Store } from '@ngxs/store';
import { Menu } from 'src/assets/utils/enums/menu';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent {
  langs:string[]=[];
  keywords:string;
  seleccionada:string

@Select(MenuState.getMenulist) menu$:Observable<MenuModel[]>;
showWhatsappButton = false;
  showWhatsappModal = false;
  whatsappModalShown = false;
menuId:string ="inicio";
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translate: TranslateService,
    
    private route : Router,
    private store : Store
                                       )
  { 
    this.langs = [...this.translate.getLangs()];
    this.translate.setDefaultLang('en');
    this.translate.setDefaultLang('es');
      this.translate.addLangs(["es","en"]);
      this.translate.use('es');
    
  }


  ngOnInit(): void {
    this.verificarRutas(); 
    this.addMetas();
    // Escuchar cambios de ruta y actualizar meta tags
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMetaByRoute(event.urlAfterRedirects);
      }
    });
  }
  /**
   * Actualiza título, descripción y keywords según la ruta
   */
  updateMetaByRoute(url: string) {
    // Limpia tags previos para evitar duplicados
    this.metaService.removeTag("name='description'");
    this.metaService.removeTag("name='keywords'");

    if (url === '/' || url.startsWith('/home')) {
      this.titleService.setTitle('Zigma Inflables | Fábrica de inflables');
      this.metaService.addTag({ name: 'description', content: 'Inflables personalizados, alquiler y fabricación profesional. Solicita cotización por WhatsApp y conoce nuestros modelos.' });
      this.metaService.addTag({ name: 'keywords', content: 'fábrica de inflables, inflables personalizados, alquiler de inflables, castillos inflables, inflables publicitarios' });
    } else if (url.includes('/home/login')) {
      this.titleService.setTitle('Iniciar sesión | Zigma Inflables');
      this.metaService.addTag({ name: 'description', content: 'Accede a tu cuenta para gestionar tus pedidos y cotizaciones de inflables.' });
      this.metaService.addTag({ name: 'keywords', content: 'login, acceso, inflables, zigma' });
    } else if (url.includes('/home/registro')) {
      this.titleService.setTitle('Registro | Zigma Inflables');
      this.metaService.addTag({ name: 'description', content: 'Regístrate para acceder a ofertas y novedades de inflables personalizados.' });
      this.metaService.addTag({ name: 'keywords', content: 'registro, crear cuenta, inflables, zigma' });
    } else if (url.includes('/home/productos/')) {
      // Detalle de producto: obtener el id desde la URL
      const match = url.match(/\/home\/productos\/[^/]+\/([^/?#]+)/);
      const id = match ? match[1] : null;
      if (id) {
        // Buscar producto en el store
        const productos = this.store.selectSnapshot(ProductosState.getProductos);
        const producto = productos.find((p: ProductoDTO) => String(p.id) === String(id) || String(p.id) === String(id));
        if (producto) {
          this.titleService.setTitle(`${producto.name}-inflable | Zigma Inflables`);
          this.metaService.addTag({ name: 'description', content: producto.descripcion + 'Conoce las características y detalles de nuestros inflables personalizados.' });
          this.metaService.addTag({ name: 'keywords', content: `inflable, ${producto.name}, inflables personalizados, productos inflables, castillos inflables, Toboganes inflables` });
          return;
        }
      }
      // Si no se encuentra el producto, usar valores genéricos
      this.titleService.setTitle('Detalle de producto | Zigma Inflables');
      this.metaService.addTag({ name: 'description', content: 'Conoce las características y detalles de nuestros inflables personalizados.' });
      this.metaService.addTag({ name: 'keywords', content: 'detalle producto, inflables, zigma, inflable personalizado' });
    } else {
      // Por defecto
      this.titleService.setTitle('Venta, Alquiler y Reparación de Inflables | Zigma');
      this.metaService.addTag({ name: 'description', content: '¿Buscas Venta de Inflables? En Zigma somos fabricantes de saltarines y publicitarios duraderos. También brindamos Alquiler y Reparación experta. ¡Ver catálogo!' });
      this.metaService.addTag({ name: 'keywords', content: 'inflables, alquiler, personalizados, zigma' });
    }
  }


  cambiaLang(event:any){
   
    this.translate.use(event)
     
   }
 verificarRutas(){
 
  
    if(this.route.url == "/")
      this.store.dispatch(new getMenu(Menu.USER));
      this.menu$.subscribe(res=>{
        console.log(res);
      })
 }

  addMetas(){
    this.translate.stream("meta_key_words.title").subscribe(res  => this.titleService.setTitle(res)); 
   this.translate.stream("meta_key_words.keywords").subscribe(r=> {
     if(r != "meta_key_words.keywords")
      this.metaService.addTag({name: 'keywords', content: `${r}`});
    });

    this.translate.stream("meta_key_words.description").subscribe(r=> {
      if(r != "meta_key_words.description")
       this.metaService.addTag({name: 'description', content: `${r}`});
     });

    this.metaService.addTag({name: 'robots', content: 'index, follow'});
  }
  configLangs() {
    // Add languages
    this.translate.addLangs(['en', 'es']);
  
    if (this.translate.getBrowserLang() == 'en') {
       this.translate.use('en');
     } else if (this.translate.getBrowserLang() == 'es') {
       this.translate.use('es');
     } else {
       this.translate.use('en');
          }
      }

      loadData(data){
        console.log(data);
      }
}