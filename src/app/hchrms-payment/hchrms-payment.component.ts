import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hchrms-payment',
  templateUrl: './hchrms-payment.component.html',
  styleUrls: ['./hchrms-payment.component.css']
})
export class HchrmsPaymentComponent {
constructor(private currentUserInfo: AuthenticationService,private formBuilder: FormBuilder,private http: HttpClient,private router:Router){}

myForm!: FormGroup;


ngOnInit() {

  const balance=this.currentUserInfo.balance;
  this.myForm = this.formBuilder.group({
    Balance: new FormControl({ value: balance, disabled: true }),
    Amount: ['', [Validators.required]],
  });
  
}


showEmptyErrot_Message:boolean=false;
showLowBalanceError_Message:boolean=false;
show_please_createAccount_Message:boolean=false;


userPhone_Number=this.currentUserInfo.AuthenticatCurrentUser;


submitForm() {
  const balanceValue = this.myForm.get('Balance')?.value;
      const amountValue = this.myForm.get('Amount')?.value;
  if (amountValue=='') {
    //alert("it is working")
    this.showEmptyErrot_Message=true;
    this.showLowBalanceError_Message=false;
    this.show_please_createAccount_Message=false;
  }else if(amountValue>balanceValue){
    this.showEmptyErrot_Message=false;
    this.showLowBalanceError_Message=true;
    this.show_please_createAccount_Message=false;
    //alert("more money")
  }
  else{
    this.showEmptyErrot_Message=false;
    this.showLowBalanceError_Message=false;
    //alert(this.userPhone_Number)
    this.check_User_Existance_in_HCHRMS();
  }

}
user_Detail!:any;
userBalance_atHCHRMS!:any;

updated_User_Balance_at_The_PaymentSystem!:any;

check_User_Existance_in_HCHRMS(){
  this.http
  .get(`http://localhost:3050/checkPhoneNumber/${this.userPhone_Number}`)
  .subscribe(
    (response) => {
      if ((response as any).message == 'User exists') {
        this.showEmptyErrot_Message=false;
        this.showLowBalanceError_Message=false;
        this.show_please_createAccount_Message=false;

        this.user_Detail=(response as any).userDetail;
        this.userBalance_atHCHRMS=this.user_Detail.Balance;
        const updated_UserBalance_at_HCHRMS=parseInt(this.userBalance_atHCHRMS)+parseInt(this.myForm.get('Amount')?.value);
        this.updated_User_Balance_at_The_PaymentSystem=parseInt(this.myForm.get('Balance')?.value) - parseInt(this.myForm.get('Amount')?.value);

        this.send_Balance_into_HCHRMS(updated_UserBalance_at_HCHRMS);
        
//alert(this.updated_User_Balance_at_The_PaymentSystem)
        
      } else {
        //this.addUser();
        // alert('still working');
        //alert('User doesnt exist');
        this.show_please_createAccount_Message=true;
      }
    },
    (error) => {
      //this.dataAdded = false;
      console.error('Error: ', error);
    }
  );
}



send_Balance_into_HCHRMS(Updated_Balance:any){

  const data = {
    PhoneNumber: this.currentUserInfo.AuthenticatCurrentUser,
    Balance: Updated_Balance
   
  };
  
  this.http.post('http://localhost:3050/UpdateUser_Balance_atHCHRMS', data).subscribe(
    (response) => {
      if ((response as any).message == 'Account updated') {
        this.update_Balance_of_user_inPayment_System(this.updated_User_Balance_at_The_PaymentSystem);


      }
      else{
        alert("sending into HCHRMS wrong")
      }
     
     
    },
    (error) => {
      console.error('Error updating Sender info:', error);
      
    }
  );


}

update_Balance_of_user_inPayment_System(Balance:any){
  let data = {
    Balance:Balance,
    Account:this.currentUserInfo.AuthenticatCurrentUser
    
  };
  this.http
    .post('http://localhost:3050/UpdateSenderAccount', data)
    .subscribe(
      (response) => {
        if ((response as any).message === 'Balance updated') {
          alert("you have transfered sucessfully")
          this.router.navigate(['/home']);

          //alert("sender Account Updated")
        } else {
          alert('something is wrong');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
}


}
