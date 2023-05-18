import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PaymentformComponent } from './paymentform/paymentform.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomePageGuard } from './home-page.guard';

const routes: Routes = [
  { path: 'registration', component:RegistrationComponent},
  {path: 'home',component:HomeComponent,canActivate:[HomePageGuard]},
  {path:'payment',component:PaymentformComponent},
  {path:'aboutus',component:AboutusComponent},
  { path: 'login', component:LoginComponent},
  { path: '',   redirectTo: 'login', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
