import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  
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

  evtRegistrarse() {
    console.log("Registrarse...");
    return false;
  }
 
}     
