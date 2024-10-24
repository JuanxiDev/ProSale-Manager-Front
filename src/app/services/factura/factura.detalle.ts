import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../../factura';


@Injectable({
  providedIn: 'root'
})


export class FacturaService {

  private urlBase ="https://prosalemanager-a6a7dndda7adcdcg.eastus-01.azurewebsites.net/inventario-app/facturas";

  constructor(private clienteHttp: HttpClient) { }

  obtenerProveedorLista(): Observable<Factura[]>{
    return this.clienteHttp.get<Factura[]>(this.urlBase)
  }

  agregarProveedor(proveedor: Factura): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, proveedor)
  }

  actualizarProveedor(id:number, proveedorEdit:Factura): Observable<Object>{    
    return this.clienteHttp.put<Factura>(`${this.urlBase}/${id}`, proveedorEdit)
  }

  eliminarProveedor(id:number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
