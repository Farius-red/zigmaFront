import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
})
export class SlidersComponent implements OnInit {


  
  slider:number = 1; 
  constructor() { }
  
  ngOnInit() {}
  
  cambiarOpacidad(slider: number) {
  this.slider= slider;
  }
}
