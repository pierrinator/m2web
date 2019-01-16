import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private username: String;
  private password: String;

  constructor(private jwtservice: JwtService, private router: Router) { }

  login() {
    if (this.username == null || this.password == null){
      return alert('Vous devez rentrer un nom d\'utilisateur et un mot de passe');
    }
    this.jwtservice.login(this.username, this.password);
   }
  register() {
    if (this.username == null || this.password == null){
      return alert('Vous devez rentrer un nom d\'utilisateur et un mot de passe');
    }
    console.log(this.jwtservice.register(this.username, this.password));
   }

   ngOnInit(){
     console.log(this.jwtservice.loggedIn());
   }
}
