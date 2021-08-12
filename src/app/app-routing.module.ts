import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './ingreso/app.component';

import { CuerpoComponent } from './layout/cuerpo.component';
import { AppRegistro } from './registro/app.registro';
import { AppTareas } from './tareas/app.tareas';

const routes: Routes = [
  {
    path: 'tareas', 
    component: AppTareas
  },
  {
    path: 'ingreso', 
    component: CuerpoComponent
  },
  {
    path: 'registro',
    component: AppRegistro
  },
  {
    path: '**',
    redirectTo: '/' 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
