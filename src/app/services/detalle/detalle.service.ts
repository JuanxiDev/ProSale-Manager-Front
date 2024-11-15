import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detalle } from '../../detalle';


@Injectable({
  providedIn: 'root'
})


export class DetalleService {

  private urlBase ="https://prosalemanager-a6a7dndda7adcdcg.eastus-01.azurewebsites.net/inventario-app/detalles";

  constructor(private clienteHttp: HttpClient) { }


  obtenerDetalleLista(): Observable<Detalle[]>{
    return this.clienteHttp.get<Detalle[]>(this.urlBase)
  }

  agregarDetalle(detalle: Detalle): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, detalle)
  }

  actualizarDetalle(id:number, detalleEdit:Detalle): Observable<Object>{    
    return this.clienteHttp.put<Detalle>(`${this.urlBase}/${id}`, detalleEdit)
  }

  eliminarDetallle(id:number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
