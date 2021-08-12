import { Component, Input, OnInit } from '@angular/core';
import { IngresoService } from '../services/ingreso.services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit  {
  @Input() public usuario: string='';
  nomusuario: string = '';
  constructor(public _ingresoservice: IngresoService) {

  }
  
  datosMenu = [
    {
      'titulo': 'Tareas',
      'icon': 'fas fa-clock',
      'url': '/tareas'
    },
    {
      'titulo': 'Ingreso',
      'icon': 'fas fa-band-aid',
      'url': '/ingreso'
    },
    {
      'titulo': 'Registro',
      'icon': 'fas fa-band-aid',
      'url': '/registro'
    },
  ]

  ngOnInit() {
    this._ingresoservice.enviarMensajeObservable.subscribe(response => {
      this.nomusuario = response;
      console.log("enviar mensaje: ",this.nomusuario)
    });
  }

  evtRegistrarse() {
    console.log("Registrarse...");
    return false;
  }
 
}     
