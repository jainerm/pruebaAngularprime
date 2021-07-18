import { Component } from '@angular/core';
import { UsuarioService } from './../services/usuario.services';
import { Usuario } from './../models/usuario.models';


@Component({
  selector: 'app-registro',
  templateUrl: './app.registro.html',
})

export class AppRegistro {
  usuarios: Array<Usuario> = [];
  constructor(private _usuarioService: UsuarioService) {

  }
  registraUsuario(
        nombreUsr: HTMLInputElement, 
        apellidoUsr: HTMLInputElement, 
        generoUsr: HTMLSelectElement, 
        correoUsr: HTMLInputElement, 
        cargoUsr: HTMLTextAreaElement) {
    console.log(nombreUsr.value, apellidoUsr.value, generoUsr.value, correoUsr.value, cargoUsr.value)
    return false;
  }
  ngOnInit() {
      this.usuarios = this._usuarioService.getData();

  }
}
