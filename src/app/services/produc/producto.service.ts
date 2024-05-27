import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../producto';


@Injectable({
  providedIn: 'root'
})



export class ProductoService {

  private urlBase ="https://prosale-back.azurewebsites.net/inventario-app/productos";

  constructor(private clienteHttp: HttpClient) { }

  obtenerProductosLista(): Observable<Producto[]>{
    return this.clienteHttp.get<Producto[]>(this.urlBase)
  }

  agregarProducto(producto: Producto): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, producto)
  }

  actualizarProducto(id:number, productoEdit:Producto): Observable<Object>{    
    return this.clienteHttp.put<Producto>(`${this.urlBase}/${id}`, productoEdit)
  }

  eliminarProducto(id:number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
