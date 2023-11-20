import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';
import { CommonModule } from '@angular/common';
import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [CommonModule, LoginPageRoutingModule],
  exports: [LoginPage],
  declarations: [LoginPage],
})
export class LoginPageModule {}
