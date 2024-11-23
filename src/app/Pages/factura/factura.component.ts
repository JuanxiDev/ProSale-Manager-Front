import { Component, Injectable } from '@angular/core';
import { Detalle } from '../../detalle';
import { Factura } from '../../factura';
import { Producto } from '../../producto';
import { DetalleService } from '../../services/detalle/detalle.service';
import { FacturaService } from '../../services/factura/factura.detalle';
import { ProductoService } from '../../services/produc/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../user';
import { LoginComponent } from '../login/login/login.component';
import { UserService } from '../../services/user/userlog.service';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  productos: Producto[];
  detalles: Detalle[];
  facturas: Factura[];
  userLoginOn: boolean = false;
  userData?: User;
  user: any = this.loginComp.userlog;
  userlog: any;
  modalDetail: boolean = false
  today: Date = new Date();

  constructor(private detalleServicio: DetalleService,
    private facturaServicio: FacturaService,
    private enrutador: Router,
    private ruta: ActivatedRoute,
    private productoServicio: ProductoService,
    private loginService: LoginService,
    private loginComp: LoginComponent,
    private userService: UserService
  ) { }

  salida(): void {
    console.log("si xd.")
    this.userLoginOn = false;
  }

  ngOnInit() {
    this.obtenerFacturas()
    this.obtenerProductos()
    this.loginService.userLogued.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
    this.obtenerDetalles()
    this.userlog = this.userService.getUserlog();
    console.log("********")
    console.log(this.facturas)
  }

  private obtenerProductos() {
    //Consumir datos del observable (se suscribe)
    this.productoServicio.obtenerProductosLista().subscribe(
      (datos => {
        this.productos = datos;
      }
      ));
  }

  obtenerDetalles() {
    // Consumir datos del observable (se suscribe)
    this.detalleServicio.obtenerDetalleLista().subscribe(
      (datos) => {
        this.detalles = datos;
      }
    );
  }

  obtenerFacturas() {
    this.facturaServicio.obtenerFacturaLista().subscribe(
      (datos => {
        this.facturas = datos;
        //this.obtenerProximoIdFactura()
      })
    );
  }

  ultimoId: number;
  nextFacturaId: number;

  /* obtenerProximoIdFactura() {
    // Si hay facturas, obtiene el ID más alto y le suma 1
    if (this.facturas.length > 0) {
      this.ultimoId = Math.max(this.facturas.map(factura => facturas.idFactura));
      this.nextFacturaId = ultimoId + 1;
    } else {
      this.nextFacturaId = 1;
    }
  } */


}
