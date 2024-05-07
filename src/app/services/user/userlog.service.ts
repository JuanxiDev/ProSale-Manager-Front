import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userlog: any;

  setUserlog(userlog: any) {
    this.userlog = userlog;
  }

  getUserlog() {
    return this.userlog;
  }
}
