import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private currentUserInfo: AuthenticationService
  ){}
  balance:any;
PhoneNumber:any;
ngOnInit(){
    this.PhoneNumber = this.currentUserInfo.AuthenticatCurrentUser;
    this.balance = this.currentUserInfo.balance;
  }


 makePayment:boolean = false;
//  payment(){
//   this.makePayment = !this.makePayment;
//  }
//  success(){
// this.paysuccess = !this.paysuccess;
//  }
//  cancelAction(){
//   this.router.navigate(['/home']);
//  }
}
