import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  constructor(private userService: UserService) {
  }

  login(username: string, password: string) {
    this.userService.login(username,password);
  }
}
