import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTrackerService {

  constructor() { }
  CurrentUser: any;
 
  isLoogedIN: boolean = false;
  login(user: any,roll:string) {
    this.CurrentUser = user;
    this.isLoogedIN=true;
  }

  logout() {
    this.CurrentUser = null;
  }
}
