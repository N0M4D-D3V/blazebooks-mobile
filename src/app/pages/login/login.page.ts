import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoutePath } from 'src/app/interfaces/route.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [],
  standalone: true,
  imports: [FormsModule],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private readonly router: Router) {}

  public loginUser(): void {
    if (this.username === 'user' && this.password === 'pass')
      this.router.navigate([RoutePath.Home]);
  }
}
