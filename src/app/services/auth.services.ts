import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../models/usuario.models";
import { JwtResponse} from './../models/jwt.response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


// Dependency injection
@Injectable()
export class AuthService {

}