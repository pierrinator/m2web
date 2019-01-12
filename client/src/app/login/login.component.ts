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
  private products  = [];

  constructor(private http: HttpClient) { }

  login() {
    console.log(`test`);
     this.http.get('https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&rows=1000&sort=-rentree_lib&facet=gd_disciscipline_lib&facet=discipline_lib&facet=aca_etab_lib&facet=reg_ins_lib&facet=dep_ins_lib&facet=diplome_rgp&facet=uucr_ins_lib&facet=uucr_ins&facet=libelle_intitule_1&facet=etablissement_lib' )
  .subscribe((res: any[]) =>{
       console.log(res);
       this.products = res["records"];
   });
  // this.http.get('http://localhost:3000/login' ).subscribe((res: any[]) =>{
  //     console.log(res);
  //     this.products = res;
  // });
  }
}
