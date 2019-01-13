import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private names  = [];
  private mainfields  = [];
  private subfields  = [];
  private academies  = [];
  private regions  = [];
  private departments  = [];
  private cities  = [];
  private diploma_types  = [];
  private diploma_names  = [];

  private url =  `https://data.enseignementsup-recherche.gouv.fr/api/v2/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/aggregates?select=`;

  constructor(private http: HttpClient) { }

  getAllSchools() {
      }

  ngOnInit() {
    this.http.get((this.url) + `etablissement_lib&group_by=etablissement_lib`)
  .subscribe((res: any[]) =>{
      console.log(res);
       this.names = res[`aggregations`];
       });
    this.http.get((this.url) + `gd_disciscipline_lib&group_by=gd_disciscipline_lib`)
  .subscribe((res: any[]) =>{
      console.log(res);
       this.mainfields = res[`aggregations`];
       });
    this.http.get((this.url) + `discipline_lib&group_by=discipline_lib`)
  .subscribe((res: any[]) =>{
      console.log(res);
       this.subfields = res[`aggregations`];
       });
    this.http.get((this.url) + `aca_etab_lib&group_by=aca_etab_lib`)
  .subscribe((res: any[]) =>{
      console.log(res);
       this.academies = res[`aggregations`];
       });
  this.http.get((this.url) + `reg_ins_lib&group_by=reg_ins_lib`)
  .subscribe((res: any[]) =>{
      console.log(res);
       this.regions = res[`aggregations`];
       });
  this.http.get((this.url) + `reg_ins_lib&group_by=dep_ins_lib`)
    .subscribe((res: any[]) =>{
        console.log(res);
        this.departments = res[`aggregations`];
        });
  this.http.get((this.url) + `reg_ins_lib&group_by=uucr_ins_lib`)
    .subscribe((res: any[]) =>{
        console.log(res);
        this.cities = res[`aggregations`];
        });
  this.http.get((this.url) + `diplome_rgp&group_by=diplome_rgp`)
      .subscribe((res: any[]) =>{
          console.log(res);
          this.diploma_types = res[`aggregations`];
          });
  this.http.get((this.url) + `libelle_intitule_1&group_by=libelle_intitule_1`)
      .subscribe((res: any[]) =>{
          console.log(res);
          this.diploma_names = res[`aggregations`];
          });
    console.log(`Init finished`);
  }

}
