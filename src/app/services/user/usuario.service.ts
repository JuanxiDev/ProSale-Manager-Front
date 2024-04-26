import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../user';


@Injectable({
  providedIn: 'root'
})



export class UsuarioService {

  private urlUsers ="http://localhost:8080/inventario-app/usuarios";

  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuariosLista(): Observable<User[]>{
    return this.clienteHttp.get<User[]>(this.urlUsers)
  }

  agregarUsuario(usuario: User): Observable<Object>{
    return this.clienteHttp.post(this.urlUsers, usuario)
  }

  actualizarUsuario(id:number, userEdit:User): Observable<Object>{    
    return this.clienteHttp.put<User>(`${this.urlUsers}/${id}`, userEdit)
  }

  eliminarUsuario(id:number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlUsers}/${id}`);
  }

}
