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
  modalDetail: boolean = false

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
    this.obtenerFacturas()
    this.loginService.userLogued.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
    this.obtenerDetalles()
    this.userlog = this.userService.getUserlog();
    console.log("********")
    console.log(this.detalles)
  }

  setEdit(isOpen:boolean){
    this.modalDetail = isOpen  
    console.log("Boton funciona")
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
    console.log("carga facturas")
  }

  //Editar Factura
  id: number;
  facturaEdit: any = [];
  detalleEdit: any = []

  cancel() {
    this.obtenerDetalles()
  }

  ver_detalle(id: number) {
    this.id = id;
    this.facturaEdit = this.detalles.find(detalles => detalles.factura.idFactura === id)
    console.log("detalle",this.facturaEdit);

    // Filtra todos los detalles asociados con el idFactura
    this.detalleEdit = this.detalles.filter(detalle => detalle.factura.idFactura === id);
    console.log("Detalles filtrados:", this.detalleEdit, this.facturaEdit.total);
    return id;
  }

}