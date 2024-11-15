import { Component, Injectable } from '@angular/core';
import { Producto } from '../../producto';
import { ProductoService } from '../../services/produc/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../user';
import { Proveedor } from '../../proveedor';
import { LoginComponent } from '../login/login/login.component';
import { ProveedorService } from '../../services/proveed/proveedor.service';



@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrl: './producto-lista.component.css'
})
export class ProductoListaComponent {
  productos: Producto[];
  proveedores: Proveedor[] ;
  userLoginOn: boolean = false;
  userData?: User;
  user: any = this.loginComp.userlog;
  modalAdd: boolean = false
  modalEdit: boolean = false

  setAdd(isOpen:boolean){
    this.modalAdd = isOpen  
    console.log("Boton funciona")
  }

  setEdit(isOpen:boolean){
    this.modalEdit = isOpen  
    console.log("Boton funciona")
  }

  gananciaTotal: number;
  porcentajeGanancia: number;

  constructor(private productoServicio: ProductoService,
    private enrutador: Router,
    private ruta: ActivatedRoute,
    private loginService: LoginService,
    private loginComp: LoginComponent,
    private proveedorServicio: ProveedorService
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
    this.obtenerProductos()
    this.obtenerProveedores()

    //Porcentaje de ganancia
    this.gananciaTotal = this.producto.precio - this.producto.precioprov
    this.porcentajeGanancia = (this.gananciaTotal / this.producto.precioprov) * 100;

  }

  private obtenerProductos() {
    //Consumir datos del observable (se suscribe)
    this.productoServicio.obtenerProductosLista().subscribe(
      (datos => {
        this.productos = datos;
      }
      ));
  }

  obtenerProveedores() {
    //Consumir datos del observable (se suscribe)

    this.proveedorServicio.obtenerProveedorLista().subscribe(
      (datos => {
        this.proveedores = datos;
      }
      ));
  }


  //Editar Producto
  id: number;
  productoEdit: any = {};

  cancel() {
    this.obtenerProductos()
    this.modalEdit = false
  }

  editarProducto(id: number) {
    this.id = id;
    this.productoEdit = this.productos.find(productos => productos.idProducto === id)
    console.log(this.productoEdit, id);
    return id;
  }

  guardarProducto(id: number): void {
    this.productoServicio.actualizarProducto(this.id, this.productoEdit).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      }
    );
    this.modalEdit = false
  }




  //TS Agregar producto
  producto: Producto = new Producto();
  selectedProveedor: string;
  addProv: any = {}


  onSubmitAdd() {
    this.modalEdit = false
    this.addProv = this.proveedores.find(proveedores => proveedores.nombreProveedor === this.selectedProveedor)
    this.producto.proveedor = this.addProv
    this.productoServicio.agregarProducto(this.producto).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      }
    )
  }

  //TS Eliminar Producto

  eliminarProducto(id: number) {
    this.productoServicio.eliminarProducto(id).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      }
    )
  }


}



