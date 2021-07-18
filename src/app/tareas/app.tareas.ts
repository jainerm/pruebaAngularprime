import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.services';
import { Usuario } from "./../models/usuario.models";


@Component({
  selector: 'app-tareas',
  templateUrl: './app.tareas.html',
})

export class AppTareas {
  usuarios: Array<Usuario> = [];
  constructor(private _usuarioService: UsuarioService) {
      this.usuarios = [];

  }
  ngOnInit() {
      this.usuarios = this._usuarioService.getData();
  }
}
