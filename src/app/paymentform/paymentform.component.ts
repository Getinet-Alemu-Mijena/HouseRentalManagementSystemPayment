import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.css']
})
export class PaymentformComponent {




constructor(private router:Router,
 private http:HttpClient,
 private currentUserInfo: AuthenticationService
 ){}

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
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.maxLength(13)
    ]),
    Paymentcode: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
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

 
  payerBalance:any;
  payerPhoneNumber:any;
  ngOnInit(){
      this.payerPhoneNumber = this.currentUserInfo.AuthenticatCurrentUser;
      this.payerBalance = this.currentUserInfo.balance;
    }

  updateSenderBalance(){
      const data = {
        PhoneNumber: this.payerPhoneNumber,
        //change to floate and continue the change
        Amount: this.payerBalance-this.amount.value
        // paymentCode: this.Paymentcode.value
      };
      // this.http.post('http://localhost:3050/
      this.http.post('http://localhost:3050/api/updateSenderBalance', data).subscribe(
        (response) => {
          console.log('Sender info updated successfully');
          // Handle success if needed
        },
        (error) => {
          console.error('Error updating Sender info:', error);
          // Handle error if needed
        }
      );
    }

    

  updateReciverInfo() {
    const payerBalanceInt=parseInt(this.payerBalance, 10)
if(this.currentUserInfo.AuthenticatCurrentUser ==  this.phoneNumber.value){

  alert("you can't send for yourself money!!");
}
  else if (payerBalanceInt < this.amount.value) {
    alert("Your Balance is less than "+ this.amount.value);
  }

else{

  this.Load_Reciever_Account();
  
//   const data = {
//     RecieverAccount: this.phoneNumber.value,
//     Amount: this.payerBalance+this.amount.value,
//     PaymentCode:this.Paymentcode.value,
//     PayerAccount:this.currentUserInfo.AuthenticatCurrentUser
//     // paymentCode: this.Paymentcode.value
//   };
//   // this.http.post('http://localhost:3050/
//   this.http.post('http://localhost:3050/api/Pay', data).subscribe(
//     (response) => {
//       console.log('User info updated successfully');
//       // Handle success if needed
//     },
//     (error) => {
//       console.error('Error updating user info:', error);
//       // Handle error if needed
//     }
//   );
// this.updateSenderBalance();
}

    
  }

Receiver_Balance_Info!:any;

Load_Reciever_Account(){
const Updated_Phone_Number="0"+this.phoneNumber.value;

  this.http.get(`http://localhost:3050/GetAccountInfo/${Updated_Phone_Number}`).subscribe(
    (data: any) => {
      this.Receiver_Balance_Info = data;
      if(this.Receiver_Balance_Info.length==0){
        alert("user doesnt exist")
      }else{
        const reciverBalance=this.Receiver_Balance_Info[0].Balance;
        //alert(this.Receiver_Balance_Info[0].Balance)
        const reciverBalanceInt=parseInt(reciverBalance,10);
        //alert(reciverBalanceInt)
        this.Make_Payment(reciverBalanceInt,Updated_Phone_Number);
      }
      
    },
    (error: any) => {
      console.log(error);
    }
  );
}

Make_Payment(reciverBalance:number,reciverAccount:any){
const UpdatedReciver_Balance=reciverBalance + (this.amount.value);
//alert(UpdatedReciver_Balance)
const UpdatedSender_Balance=parseInt(this.payerBalance) - this.amount.value;
//alert("it is working")

this.UpdateReciver_Balance(UpdatedReciver_Balance,reciverAccount);
this.UpdateSender_Balance(UpdatedSender_Balance);



}


UpdateReciver_Balance(Balance:number,Account:any){
  let data = {
    Balance:Balance,
    Account:Account
    
  };
  this.http
    .post('http://localhost:3050/UpdateReciverAccount', data)
    .subscribe(
      (response) => {
        if ((response as any).message === 'Balance updated') {
          
this.send_Payment_VerificationTo_The_System();
        // alert("reciver Account Updated")
        } else {
          alert('something is wrong');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
}

UpdateSender_Balance(Balance:number){
  let data = {
    Balance:Balance,
    Account:this.currentUserInfo.AuthenticatCurrentUser
    
  };
  this.http
    .post('http://localhost:3050/UpdateSenderAccount', data)
    .subscribe(
      (response) => {
        if ((response as any).message === 'Balance updated') {
          

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


send_Payment_VerificationTo_The_System(){
  let data = {
    Amount:this.amount.value,
    Payment_Code:this.Paymentcode.value
    
  };
  this.http
    .post('http://localhost:3050/SendPaymentVerification', data)
    .subscribe(
      (response) => {
        if ((response as any).message === 'verification sent') {
          //this.router.navigate(['/home']);
this.Load_Payer_And_House_Information();
          
        } else {
          alert('You Have transfred the monry');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
}


House_And_Tenant_Info!:any;

Load_Payer_And_House_Information(){
  this.http.get(`http://localhost:3050/Get_Payer_And_House_Id/${this.Paymentcode.value}/${this.amount.value}`).subscribe(
    (data: any) => {
      this.House_And_Tenant_Info = data;
      if(this.House_And_Tenant_Info==data){
        this.Change_Other_Houses_Status_ToNot_Selected();
      }
      
    },
    (error: any) => {
      console.log(error);
    }
  );
}




Change_Other_Houses_Status_ToNot_Selected(){
  let data = {
    Hid:this.House_And_Tenant_Info[0].Hid
    
  };
  this.http
    .post('http://localhost:3050/ChangeOtherHousesStatus', data)
    .subscribe(
      (response) => {
        if ((response as any).message === 'status updated') {
         this.Change_Status_ofHouse_ToPayed();
        } else {
          alert('something wrong');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
}



Change_Status_ofHouse_ToPayed(){
  let data = {
    Hid:this.House_And_Tenant_Info[0].Hid,
    UserId:this.House_And_Tenant_Info[0].UserId
    
  };
  this.http
    .post('http://localhost:3050/ChangeStatusOfHouseToPayed', data)
    .subscribe(
      (response) => {
        if ((response as any).message === 'status updated') {
          this.router.navigate(['/home']);

          alert("Payment completed now")
        } else {
          alert('something wrong');
        }
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
}



}







