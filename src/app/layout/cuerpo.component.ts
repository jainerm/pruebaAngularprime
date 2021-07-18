import { Component } from '@angular/core';
import { IngresoService } from './../services/ingreso.services';
import { Ingreso } from './../models/ingreso.models';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
})

export class CuerpoComponent {
  ingreso: Array<Ingreso> = [];
  constructor(private _ingresoService: IngresoService) {

  }
  ingresaUsr(inpUsuario: HTMLInputElement, inpContrasena: HTMLInputElement) {
        console.log(inpUsuario.value, inpContrasena.value );
        return false;
  }
  ngOnInit() {
    this.ingreso = this._ingresoService.getData();

}
}
