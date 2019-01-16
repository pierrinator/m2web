import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable()

export class AuthGuardService implements CanActivate {

  constructor(public auth: JwtService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}