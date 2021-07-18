import { Injectable } from "@angular/core";
import { Ingreso } from "../models/ingreso.models";

// Dependency injection
@Injectable()
export class IngresoService {
    selectIngreso: Ingreso = new Ingreso();

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
}
