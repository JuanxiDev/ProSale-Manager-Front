import { Component, Injectable } from '@angular/core';
import { Producto } from '../../producto';
import { ProductoService } from '../../services/produc/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../user';

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
  userLoginOn: boolean = false;
  userData?: User;

  constructor(private productoServicio: ProductoService,
    private enrutador: Router,
    private ruta: ActivatedRoute,
    private loginService: LoginService) { }


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

    this.loginService.loguedUserData.subscribe({
      next: (userData) => {
        this.userData = userData
      }
    });
    this.obtenerProductos()
  }

  private obtenerProductos() {
    //Consumir datos del observable (se suscribe)
    this.productoServicio.obtenerProductosLista().subscribe(
      (datos => {
        this.productos = datos;
      })
    );
  }


  //Editar Producto
  id: number;
  productoEdit: any = {};

  cancel() {
    this.obtenerProductos()
  }

  editarProducto(id: number) {
    this.id = id;
    this.productoEdit = this.productos.find(productos => productos.idProducto === id)
    console.log("editarProducto ", id, this.productoEdit);
    return id;
  }


  onSubmitEdit(id: number) {
    this.guardarProducto(this.id);
    console.log("onSubmitEdit", this.id, this.productoEdit);

  }

  guardarProducto(id: number): void {
    this.productoServicio.actualizarProducto(this.id, this.productoEdit).subscribe(
    );
    console.log("guardarProducto: ", this.id, this.productoEdit);
  }




  //TS Agregar producto
  producto: Producto = new Producto();

  onSubmitAdd() {
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



