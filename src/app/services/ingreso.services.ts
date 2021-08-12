import { Injectable } from "@angular/core";
//import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/firebase/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingreso } from "../models/ingreso.models";

export interface item { name: string; }

// Dependency injection
@Injectable({
  providedIn: 'root'
})
export class IngresoService {
    //private itemsCollection: AngularFirestoreCollection<Item>;
    //private itemDoc:AngularFirestoreDocument<Item>;
    public nombreUsuario: string = "Sig-in"; 
    selectIngreso: Ingreso = new Ingreso();
    private enviarMensajeSubject = new Subject<string>();  
    enviarMensajeObservable = this.enviarMensajeSubject.asObservable();

    enviarMensaje(mensaje: string) {
      this.nombreUsuario = mensaje;
      this.enviarMensajeSubject.next(mensaje);
    }
    constructor() {
      
    }
  
    getIngreso() {
    }
    insertIngreso(ingreso: Ingreso) {
    }
    updateIngreso(ingreso: Ingreso) {
    }
    deleteIngreso($key: string) {
    }
    ingreso: Array<Ingreso> = [ 
      {
        correoUsr: "jainerm6705@gmail.com",
        contrasenaUsr: "Ja05ms67"
      }
    ];  
    getData() {
        return this.ingreso;
    }
    setData(valor: string) {
        this.nombreUsuario = valor;
    }
}
