import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario.models";

// Dependency injection
@Injectable()
export class UsuarioService {
    selectUsuario: Usuario = new Usuario();

    constructor() {
      
    }
    getUsuario() {
    }
    insertUsuario(usuario: Usuario) {
    }
    updateUsuario(usuario: Usuario) {
    }
    deleteUsuario($key: string) {
    }
    usuarios: Array<Usuario> = [ 
      {
        id: "1",
        nombreUsr: "Jainer A.",
        apellidoUsr: "Marin Serrano",
        correoUsr: "jainerm6705@gmail.com",
        generoUsr: "Masculino",
        cargoUsr: "Ingeniero Full Stack"
      }
    ];  
    getData() {
        return this.usuarios;
    }
}
