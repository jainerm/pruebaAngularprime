import { Component, OnInit} from '@angular/core';
import { IngresoService } from './../services/ingreso.services';
import { Ingreso } from './../models/ingreso.models';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
})

export class CuerpoComponent implements OnInit {
  //nuvousuario: string='';
  ingreso: Array<Ingreso> = [];
  constructor(public _ingresoService: IngresoService) {

  }
  ingresaUsr(inpUsuario: HTMLInputElement, inpContrasena: HTMLInputElement) {
    //this.nuvousuario = inpUsuario.value;
    this._ingresoService.setData(inpUsuario.value);
    console.log(this._ingresoService.nombreUsuario);
    return false;
  }

  ngOnInit() {
    this.ingreso = this._ingresoService.getData();
    return false;
  }
}
