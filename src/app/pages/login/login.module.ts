import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';
import { CommonModule } from '@angular/common';
import { LoginPageRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, LoginPageRoutingModule],
  exports: [LoginPage],
  declarations: [LoginPage],
})
export class LoginPageModule {}
