import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../../proveedor';


@Injectable({
  providedIn: 'root'
})


export class ProveedorService {

  private urlBase ="http://localhost:8080/inventario-app/proveedores";

  constructor(private clienteHttp: HttpClient) { }

  obtenerProveedorLista(): Observable<Proveedor[]>{
    return this.clienteHttp.get<Proveedor[]>(this.urlBase)
  }

  agregarProveedor(proveedor: Proveedor): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, proveedor)
  }

  actualizarProveedor(id:number, proveedorEdit:Proveedor): Observable<Object>{    
    return this.clienteHttp.put<Proveedor>(`${this.urlBase}/${id}`, proveedorEdit)
  }

  eliminarProveedor(id:number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
