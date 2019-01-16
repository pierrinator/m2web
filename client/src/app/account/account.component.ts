import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private jwtservice: JwtService, private router: Router) { }

  logout() {
    this.jwtservice.logout();
    this.router.navigate(['login']);
   }

  ngOnInit() {
  }

}
