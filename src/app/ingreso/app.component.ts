import { Component, OnInit } from '@angular/core';
import { IngresoService } from '../services/ingreso.services';

@Component({
  selector: 'app-raiz',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public nomusuario: string='';
  title = 'tareasAngular';
  
  constructor(public _ingresoservice: IngresoService) {

  }
  ngOnInit() {
     this.nomusuario = this._ingresoservice.nombreUsuario;

  }

}
