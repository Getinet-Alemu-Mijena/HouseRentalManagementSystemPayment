import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private currentUserInfo: AuthenticationService,
    private http:HttpClient
  ){}
  balance:any;
PhoneNumber:any;
ngOnInit(){
    this.PhoneNumber = this.currentUserInfo.AuthenticatCurrentUser;

    //this.balance = this.currentUserInfo.balance;

    this.Get_Balance_ofUser();

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

Balance_Info!:any;

Get_Balance_ofUser(){
  this.http.get(`http://localhost:3050/GetAccountInfo/${this.PhoneNumber}`).subscribe(
    (data: any) => {
      this.Balance_Info = data;
      this.currentUserInfo.userBalance(this.Balance_Info[0].Balance);
      //console.log(this.users);erere
    },
    (error: any) => {
      console.log(error);
    }
  );
}
}


