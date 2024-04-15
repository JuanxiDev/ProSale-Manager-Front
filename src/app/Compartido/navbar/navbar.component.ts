import { Component } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { ProductoListaComponent } from '../../Pages/producto-lista/producto-lista.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userLoginOn: boolean = false;

  constructor(private loginService: LoginService, private product: ProductoListaComponent,) { }


  /* ngOnDestroy(): void {
    this.loginService.userLogued.unsubscribe()
  } */
  
  ngOnInit(): void {
    this.loginService.userLogued.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      }
    )
  }


  logout(){
    this.loginService.userLogued.next(false)
    console.log("llega")
  }


}

