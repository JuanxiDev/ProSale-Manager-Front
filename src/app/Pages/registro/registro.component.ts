import { Component, Injectable } from '@angular/core';
import { Detalle } from '../../detalle';
import { Factura } from '../../factura';
import { DetalleService } from '../../services/detalle/detalle.service';
import { FacturaService } from '../../services/factura/factura.detalle';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../user';
import { LoginComponent } from '../login/login/login.component';
import { UserService } from '../../services/user/userlog.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroListaComponent {
  detalles: Detalle[];
  facturas: Factura[];
  userLoginOn: boolean = false;
  userData?: User;
  user: any = this.loginComp.userlog;
  userlog: any;

  constructor(private detalleServicio: DetalleService,
    private facturaServicio: FacturaService,
    private enrutador: Router,
    private ruta: ActivatedRoute,
    private loginService: LoginService,
    private loginComp: LoginComponent,
    private userService: UserService
  ) { }


  salida(): void {
    console.log("si xd.")
    this.userLoginOn = false;
  }



  ngOnInit() {
    this.loginService.userLogued.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
    this.obtenerDetalles()
    this.obtenerFacturas()
    this.userlog = this.userService.getUserlog();
    console.log("********")
    console.log(this.detalles)
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
      })
    );
  }

  //Editar Factura
  id: number;
  detalleEdit: any = {};

  cancel() {
    this.obtenerDetalles()
  }

  ver_detalle(id: number) {
    this.id = id;
    this.detalleEdit = this.detalles.find(detalles => detalles.factura.idFactura === id)
    console.log("detalle",this.detalleEdit.factura.idFactura);
    return id;
  }

}