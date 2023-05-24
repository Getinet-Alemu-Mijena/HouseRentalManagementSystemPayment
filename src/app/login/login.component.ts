import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private http: HttpClient,
  private fb: FormBuilder,
  private router: Router,
  private currentUserInfo:AuthenticationService
 ){}

IncorrectUserOrPassword!: string;
UserRole!:string;
  loginForm = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[+251]?[0]?[1-9]*'),
      Validators.minLength(10),
      Validators.maxLength(13)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ])
  });
  get phoneNumber(): FormControl {
    return this.loginForm.get('phoneNumber') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }




  balance!: any;

Balance() {
  this.http.get(`http://localhost:3050/PayerBalance/${this.phoneNumber.value}`).subscribe(
    (data: any) => {
      console.log(data);
      this.balance = data[0].Balance;
      // alert(this.balance);
      this.currentUserInfo.userBalance(this.balance);
    },
    (error: any) => {
      console.log(error);
    }
  );
}


  LoginSubmitted(){

    this.http
        .get(`http://localhost:3050/loginCheckPayment/${this.phoneNumber.value}/${this.password.value}`)
        .subscribe(
          (response) => {
            if ((response as any).message == 'User exists') {
              
            this.currentUserInfo.login(this.phoneNumber.value,this.password.value);
            this.router.navigate(['/home']);
            } else {
              this.IncorrectUserOrPassword="Incorrect phone number Or Password";
            }
          },
          (error) => {
            //this.dataAdded = false;
            console.error('Error: ', error);
          }
        );

  }

  
}
