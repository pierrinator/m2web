import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: String, password: String) {
    return this.httpClient.post('http://localhost:3000/login', {'username': username, 'password': password})
    .subscribe((res: any) =>{
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('id', res.id);
      this.router.navigate(['account']);
  });
  }

  register(username: String, password: String) {
    return this.httpClient.post('http://localhost:3000/register', {'username': username, 'password': password})
    .subscribe((res: any) =>{
     }); 
}
logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id');
}

public loggedIn(): boolean {
  return localStorage.getItem('access_token') !==  null;
}

public getId(): String {
  return localStorage.getItem('id');
}



}
