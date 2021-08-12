import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// firebase
//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { environment } from 'src/environments/environment';

// Rutas principales 
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './ingreso/app.component';

import { AppRegistro } from './registro/app.registro';
import { AppTareas } from './tareas/app.tareas';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { CuerpoComponent } from './layout/cuerpo.component';
import { UsuarioService } from './services/usuario.services';
import { IngresoService } from './services/ingreso.services';

@NgModule({
  declarations: [
    AppComponent,
    AppRegistro,
    HeaderComponent,
    FooterComponent,
    CuerpoComponent,
    AppTareas
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [UsuarioService, IngresoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
