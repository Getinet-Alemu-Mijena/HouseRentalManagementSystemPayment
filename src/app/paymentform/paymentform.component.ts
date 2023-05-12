import { Component } from '@angular/core';
import {Router } from '@angular/router';
@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.css']
})
export class PaymentformComponent {

constructor(private router:Router){}
success:boolean = false;
  cancelAction(){
    this.router.navigate(['/home']);
  }

  successMessage(){
   this.success = !this.success;
  }
}
