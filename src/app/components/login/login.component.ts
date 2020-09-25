import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() : void {
    var username = this.loginForm.value.username;
    var password = this.loginForm.value.password;
    this.authService.login(username, password);
  }

}
