import { Component } from '@angular/core';
import { DemiModalService } from 'demiurge';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: [],
  standalone: true,
  imports: [],
})
export class CreateUserFormComponent {
  constructor(public readonly demiModalService: DemiModalService) {}

  public onCreateUser(): void {
    console.log('on create user');
  }

  public onClose(): void {
    this.demiModalService.close();
  }
}
