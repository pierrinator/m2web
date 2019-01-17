import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public username: String;
  public password: String;
  showSpinner;

  constructor(private jwtservice: JwtService, private router: Router) { }

  login() {
    if (this.username == null || this.password == null || this.username == '' || this.password == ''){
      return alert('Vous devez rentrer un nom d\'utilisateur et un mot de passe');
    }
    this.jwtservice.login(this.username, this.password);
   }
  register() {
    if (this.username == null || this.password == null || this.username == '' || this.password == ''){
      return alert('Vous devez rentrer un nom d\'utilisateur et un mot de passe');
    }
    this.jwtservice.register(this.username, this.password);
   }

   ngOnInit(){
     
   }
}
