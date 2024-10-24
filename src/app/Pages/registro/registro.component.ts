import { Component, Injectable } from '@angular/core';
import { Detalle } from '../../detalle';
import { DetalleService } from '../../services/detalle/detalle.service';
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
  userLoginOn: boolean = false;
  userData?: User;
  user: any = this.loginComp.userlog;
  userlog: any;

  constructor(private detalleServicio: DetalleService,
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
    this.userlog = this.userService.getUserlog();
    console.log(this.userlog);
  }

  obtenerDetalles() {
    //Consumir datos del observable (se suscribe)
    
    this.detalleServicio.obtenerDetalleLista().subscribe(
      (datos=> {
        this.detalles = datos;
      }
    ));
  }

  //TS Agregar Factura
  detalle: Detalle = new Detalle();

  onSubmitDet() {
    this.detalleServicio.agregarDetalle(this.detalle).subscribe(
      {
        next: (datos) => this.obtenerDetalles(),
        error: (errores) => console.log(errores)
      }
    )
  }

  //Editar Proveedor
  id: number;
  detalleEdit: any = {};

  cancel() {
    this.obtenerDetalles()
  }

  ver_detalle(id: number) {
    this.id = id;
    this.detalleEdit = this.detalles.find(detalles => this.detalle.factura.idFactura === id)
    console.log("editarDetalle ", id, this.detalleEdit);
    return id;
  }
  

}

