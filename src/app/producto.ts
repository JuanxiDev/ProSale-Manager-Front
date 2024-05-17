import { Proveedor } from "./proveedor";

export class Producto {
    idProducto: number;
    nombreProducto: string;
    descripcion: string;
    precio: number;
    proveedor: Proveedor;
    precioprov: number;
    stock: number;
}
