
import { Component, Injectable } from '@angular/core';
import { Producto } from '../../producto';
import { UsuarioService } from '../../services/user/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../user';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  productos: Producto[];
  usuarios: User[];
  userLoginOn: boolean = false;
  userData?: User;

  constructor(private usuarioServicio: UsuarioService,
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
    this.obtenerUsuarios()
  }

  private obtenerUsuarios() {
    //Consumir datos del observable (se suscribe)
    this.usuarioServicio.obtenerUsuariosLista().subscribe(
      (datos => {
        this.usuarios = datos;
      })
    );
  }


  //Editar Producto
  id: number;
  userEdit: any = {};

  cancel() {
    this.obtenerUsuarios()
  }

  editarUsuario(id: number) {
    this.id = id;
    this.userEdit = this.usuarios.find(usuarios => usuarios.idUser === id)
    console.log("editarProducto ", id, this.userEdit);
    return id;
  }


  onSubmitEdit(id: number) {
    this.guardarUsuario(this.id);
    console.log("onSubmitEdit", this.id, this.userEdit);

  }

  guardarUsuario(id: number): void {
    this.usuarioServicio.actualizarUsuario(this.id, this.userEdit).subscribe(
    );
    console.log("guardarProducto: ", this.id, this.userEdit);
  }




  //TS Agregar producto
  usuario: User = new User();

  onSubmitAdd() {
    this.usuarioServicio.agregarUsuario(this.usuario).subscribe(
      {
        next: (datos) => this.obtenerUsuarios(),
        error: (errores) => console.log(errores)
      }
    )
  }

  //TS Eliminar Producto

  eliminarUsuario(id: number) {
    this.usuarioServicio.eliminarUsuario(id).subscribe(
      {
        next: (datos) => this.obtenerUsuarios(),
        error: (errores) => console.log(errores)
      }
    )
  }


}