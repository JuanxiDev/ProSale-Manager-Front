import { Producto } from "./producto";
import { Factura } from "./factura";

export class Detalle {
    idDetalle: number;
    factura: Factura;
    producto: Producto
    cantidad: number;
}
