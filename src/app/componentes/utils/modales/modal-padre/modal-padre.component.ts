import { RegistroTrabajosComponent } from './../registro-trabajos/registro-trabajos.component';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-modal-padre',
    templateUrl: './modal-padre.component.html',
    styleUrls: ['./modal-padre.component.scss'],
    standalone: false
})
export class ModalPadreComponent implements OnInit {

  @Input() tituloBotonModal :string;
  @Input() component  = RegistroTrabajosComponent;
  constructor(private ctrModal: ModalController) { }

  ngOnInit() {}
  
  async openModal() {
    const modal = await this.ctrModal.create({
      component: RegistroTrabajosComponent,
     
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

   
  }

}
