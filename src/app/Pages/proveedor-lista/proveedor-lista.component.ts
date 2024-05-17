import { Component, Injectable } from '@angular/core';
import { Proveedor } from '../../proveedor';
import { ProveedorService } from '../../services/proveed/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../user';
import { LoginComponent } from '../login/login/login.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-proveedor-lista',
  templateUrl: './proveedor-lista.component.html',
  styleUrl: './proveedor-lista.component.css'
})
export class ProveedorListaComponent {
  proveedores: Proveedor[];
  userLoginOn: boolean = false;
  userData?: User;
  user: any = this.loginComp.userlog;

  constructor(private proveedorServicio: ProveedorService,
    private enrutador: Router,
    private ruta: ActivatedRoute,
    private loginService: LoginService,
    private loginComp: LoginComponent
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
    this.obtenerProveedores()
  }

  obtenerProveedores() {
    //Consumir datos del observable (se suscribe)
    
    this.proveedorServicio.obtenerProveedorLista().subscribe(
      (datos=> {
        this.proveedores = datos;
      }
    ));
  }


  //Editar Proveedor
  id: number;
  proveedorEdit: any = {};

  cancel() {
    this.obtenerProveedores()
  }

  editarProveedor(id: number) {
    this.id = id;
    this.proveedorEdit = this.proveedores.find(proveedores => proveedores.idProveedor === id)
    console.log("editarProveedor ", id, this.proveedorEdit);
    return id;
  }


  onSubmitEdit(id: number) {
    this.guardarProveedor(this.id);
    console.log("onSubmitEdit", this.id, this.proveedorEdit);

  }

  guardarProveedor(id: number): void {
    this.proveedorServicio.actualizarProveedor(this.id, this.proveedorEdit).subscribe(
    );
    console.log("guardarProveedor: ", this.id, this.proveedorEdit);
  }




  //TS Agregar Proveedor
  proveedor: Proveedor = new Proveedor();

  onSubmitProv() {
    this.proveedorServicio.agregarProveedor(this.proveedor).subscribe(
      {
        next: (datos) => this.obtenerProveedores(),
        error: (errores) => console.log(errores)
      }
    )
  }

  //TS Eliminar Proveedor

  eliminarProveedor(id: number) {
    this.proveedorServicio.eliminarProveedor(id).subscribe(
      {
        next: (datos) => this.obtenerProveedores(),
        error: (errores) => console.log(errores)
      }
    )
  }

}
