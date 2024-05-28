import { Component, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { LoginRequest } from '../../../services/auth/login.request';
import { User } from '../../../user';
import { UsuarioService } from '../../../services/user/usuario.service';
import { UserService } from '../../../services/user/userlog.service';
import { AppComponent } from '../../../app.component'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorLogin: boolean = false;
  loginError: string = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private usuarioServicio: UsuarioService,
    private userService: UserService,
    private appComp: AppComponent
  ) { this.usuarios = []; }


  ngOnInit() {
    this.appComp.mostrarNavbar = false
    this.usuarioServicio.obtenerUsuariosLista().subscribe(
      (datos => {
        this.usuarios = datos;
      })
    );
  }

  //Alerta de usuario

  mostrarAlertaInactivo() {
    window.alert('Tu usuario se encuentra inactivo por favor comunicate con el administrador.');
  }

  //prueba base de datos

  usuarios: User[];
  username: string = "";
  passcode: string = "";
  userNotFound: boolean = false;
  passNotFound: boolean = false;
  userlog: any = {};


  login2(username: string, passcode: string) {
    this.userlog = this.usuarios.find(usuarios => usuarios.name === this.username)
    if (this.userlog) {
      console.log("userlog es: ", username, this.userlog.password, passcode);
      this.userService.setUserlog(this.userlog)
      if (this.passcode === this.userlog.password) {
        console.log("contraseña correcta");
        if (this.userlog.status === "Activo") {
          this.loginService.login({ username, passcode } as unknown as LoginRequest).subscribe({
            next: (userData) => {
              console.log(userData)
            },
            error: (errorData) => {
              console.error("algo anda mal...", errorData);
              this.userNotFound = true;
            },
            complete: () => {
              console.info("Login correcto");
              this.router.navigateByUrl('')
            }
          })
        }
        else {
          this.mostrarAlertaInactivo();
          console.log("usuario inactivo");
        }
      } else {
        console.log(" contraseña incorrecta");
        this.passNotFound = true
      }
    } else {
      console.log(" usuario no encontrado");

      this.userNotFound = true;
    }

    return this.username;
  }

  getUserLog() {
    return this.userlog;
  }


}
