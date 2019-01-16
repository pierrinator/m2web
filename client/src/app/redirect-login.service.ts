import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable()

export class RedirectLoginService implements CanActivate {

  constructor(public auth: JwtService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      this.router.navigate(['account']);
      return false;
    }
    return true;
  }
}