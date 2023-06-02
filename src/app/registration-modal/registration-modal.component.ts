import { Component } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent {

 constructor(private userService: UserService) {
  }

  register(username: string, email: string, password: string, confirmPassword: string) {
    this.userService.register(username,email,password,confirmPassword);
  }
}
