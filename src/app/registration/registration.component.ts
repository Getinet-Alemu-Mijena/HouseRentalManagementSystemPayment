import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

   constructor( private http:HttpClient,private router: Router){};
 
  registerForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(2),
      Validators.pattern('[a-zA-Z].*')
    ]),
    // username: new FormControl('',[
    //   Validators.required,
    //   Validators.maxLength(2),
    //   Validators.pattern('[a-zA-Z].*')
    // ]),
    // email: new FormControl('',[
    //   Validators.required,
    //   Validators.email
    // ])
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[+251]?[0]?[1-9]*'),
      Validators.minLength(10),
      Validators.maxLength(13),
    ]),
    gender: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]),
    ConfirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ])
  });

  get firstname(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }
  get lastname(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }
  // get username(): FormControl {
  //   return this.registerForm.get('username') as FormControl;
  // }
  // get email(): FormControl {
  //   return this.registerForm.get('email') as FormControl;
  // }
  get phoneNumber(): FormControl {
    return this.registerForm.get('phoneNumber') as FormControl;
  }
  get gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }
  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.registerForm.get('ConfirmPassword') as FormControl;
  }

  passWordValidators(): boolean {
    if (this.password.value === this.ConfirmPassword.value) {
      return true;
    }
    else {
      return false;
    }
  }

  addUser(){
    let data = {
      fname: this.firstname.value,
      lname: this.lastname.value,
      phoneN: this.phoneNumber.value,
      Gender: this.gender.value,
      passw: this.password.value
    };
    this.http.post('http://localhost:3050/addUser', data).subscribe(
      (response) => {
        if ((response as any).message == 'User added successfully') {

          this.registerForm.reset();
          alert('User added sucessfully');
        } else {
          alert('something is wrong');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }

  checkUser(){
    this.http
    .get(`http://localhost:3050/checkUsers/${this.firstname.value}/${this.lastname.value}/${this.phoneNumber.value}`)
    .subscribe(
      (response) => {
        if ((response as any).message == 'User already exists') {
          alert('User already exists');
        } else {
          this.addUser();
          // alert('still working');
        }
      },
      (error) => {
        //this.dataAdded = false;
        console.error('Error: ', error);
      }
    );
  }
}