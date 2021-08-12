import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.services';
import { IngresoService } from '../services/ingreso.services';
import { Usuario } from "./../models/usuario.models";


@Component({
  selector: 'app-tareas',
  templateUrl: './app.tareas.html',
})

export class AppTareas implements OnInit {
  usuarios: Array<Usuario> = [];
  public siRegistrado = false;
  nuvousuario: string = '';
  constructor(private _usuarioService: UsuarioService, private _ingresoService: IngresoService) {
      this.usuarios = [];
  }
  ngOnInit() {
    this.usuarios = this._usuarioService.getData();
    this.usuarios.forEach(item => {
      if(item.nombreUsr != 'Sig-in') {
        this.siRegistrado = true;
        console.log("Cargado y listo tareas...", item.nombreUsr);
      }
     });

  }
  ngAfterViewInit() {
  }
}
