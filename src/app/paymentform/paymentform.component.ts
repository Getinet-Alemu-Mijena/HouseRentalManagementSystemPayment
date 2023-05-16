import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.css']
})
export class PaymentformComponent {

constructor(private router:Router,
 private http:HttpClient){}
success:boolean = false;
  cancelAction(){
    this.router.navigate(['/home']);
  }

  successMessage(){
   this.success = !this.success;
  }
  registerForm = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[+251]?[0]?[1-9]*'),
      Validators.minLength(10),
      Validators.maxLength(13)
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(4),
      Validators.maxLength(13)
    ]),
    Paymentcode: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.maxLength(6)
    ])
  });

  get phoneNumber(): FormControl {
    return this.registerForm.get('phoneNumber') as FormControl;
  }
  get amount(): FormControl {
    return this.registerForm.get('amount') as FormControl;
  }
  get Paymentcode(): FormControl {
    return this.registerForm.get('Paymentcode') as FormControl;
  }

 


  updateUserInfo() {
    const data = {
      PhoneNumber: this.phoneNumber.value,
      Amount: this.amount.value
      // paymentCode: this.Paymentcode.value
    };

    this.http.post('/api/updateUserInfo', data).subscribe(
      (response) => {
        console.log('User info updated successfully');
        // Handle success if needed
      },
      (error) => {
        console.error('Error updating user info:', error);
        // Handle error if needed
      }
    );
  }
}





