import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Third } from 'src/app/core/modelos/Third';
import { ServiceThird } from 'src/app/core/servicios/formularios/service.third';




@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit {
  @Input ()  isEdit: boolean = false;
  constructor(private router:Router,private service:ServiceThird) { }

  ngOnInit() {
  }
  third = new Third;
  SaveThird(){  
    this.third.namethird=this.third.firsname+" "+this.third.secondname+" "+this.third.firstsurname+" "+this.third.secondsurname
    this.service.saveThird(this.third)
    .subscribe(data=>{
      alert("Se Agrego con Exito!");
      this.router.navigate(["app.component"]);
    })

  }

  Listar(){
    this.isEdit = true;
  }


}
