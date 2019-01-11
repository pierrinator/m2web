import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
   url = 'http://localhost:3000';
  private password: string;
  private username: string;
  private tataa: string[];

  constructor(private http: HttpClient) { }

  login() {
    console.log(`test`);
    return this.http.get('http://localhost:3000/school');
  }
}
