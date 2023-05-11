import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private router: Router,

  ){

  }
 makePayment:boolean = false;
 paysuccess:boolean = false;

 payment(){
  this.makePayment = !this.makePayment;
 }
 success(){
this.paysuccess = !this.paysuccess;
 }
 cancelAction(){
  this.router.navigate(['/home']);
 }
}
