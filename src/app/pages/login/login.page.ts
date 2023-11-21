import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private readonly router: Router) {}

  public loginUser(): void {
    if (this.username === 'user' && this.password === 'pass')
      this.router.navigate(['/home']);
  }
}
