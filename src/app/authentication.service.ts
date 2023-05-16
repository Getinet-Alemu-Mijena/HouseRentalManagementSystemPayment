import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 
  constructor() { }
  AuthenticatCurrentUser: any;
  isLoogedIN: boolean = false;
  login(user: any,roll:string) {
    this.AuthenticatCurrentUser = user;
    this.isLoogedIN=true;
  }

  logout() {
    this.AuthenticatCurrentUser = null;
  }
}
