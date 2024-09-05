import { Component } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { UserService } from '../../services/user/userlog.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userLoginOn: boolean = false;
  userlog: any;


  constructor(private loginService: LoginService,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.loginService.userLogued.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      }
    )
    this.userlog = this.userService.getUserlog();
  }


  logout() {
    this.loginService.userLogued.next(false)
    console.log("llega")
  }


}

