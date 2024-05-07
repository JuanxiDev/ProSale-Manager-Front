import { Injectable } from '@angular/core';
import { LoginRequest } from './login.request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from '../../user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogued: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loguedUserData: BehaviorSubject<User> = new BehaviorSubject<User>({ idUser:1, username: ' ', name: ' ', lastname: ' ', telefono: 3, rol: '', status: '', password: ' '})

  constructor(private cliente: HttpClient) { }


  login(credentials: LoginRequest): Observable<User> {
    return this.cliente.get<User>('././assets/data.json').pipe(
      tap((userData: User) => {
        this.loguedUserData.next(userData);
        this.userLogued.next(true)
      }),
      catchError(this.posibleError)
    )
  }


  private posibleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha detectado un error')
    }
    else {
      console.error('Backend retornó el código de error', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intenta nuevamente'));
  }


  get userData(): Observable<User> {
    return this.loguedUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.userLogued.asObservable();
  }


}
