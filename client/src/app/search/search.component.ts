import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  private selectedName: string;
  private selectedMainfield: string;
  private selectedSubfield: string;
  private selectedAcademy: string;
  private selectedRegion: string;
  private selectedDepartment: string;
  private selectedCity: string;
  private selectedDiplomaT: string;
  private names  = [];
  private mainfields  = [];
  private subfields  = [];
  private academies  = [];
  private regions  = [];
  private departments  = [];
  private cities  = [];
  private diploma_types  = [];

  private resSearch = [];

  private url =  `https://data.enseignementsup-recherche.gouv.fr/api/v2/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/aggregates?select=`;

  displayedColumns: string[] = ['school_name', 'main_field', 'sub_field', 'academy',
   'region', 'department', 'city', 'type_diploma', 'diploma_name'];
   dataSource = new MatTableDataSource<any>(this.resSearch);
   selection = new SelectionModel<any>(true, []);

  constructor(private http: HttpClient) { }

  search  () {
    let urlGet = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&rows=100&sort=-rentree_lib&facet=gd_disciscipline_lib&facet=discipline_lib&facet=aca_etab_lib&facet=reg_ins_lib&facet=dep_ins_lib&facet=diplome_rgp&facet=uucr_ins_lib&facet=libelle_intitule_1&facet=etablissement_lib';

    if(this.selectedName != undefined) {
      urlGet += '&refine.etablissement_lib=' + this.selectedName;
    }
    if(this.selectedMainfield != undefined) {
      urlGet += '&refine.gd_disciscipline_lib=' + this.selectedMainfield;
    }
    if(this.selectedSubfield != undefined) {
      urlGet += '&refine.discipline_lib=' + this.selectedSubfield;
    }
    if(this.selectedAcademy != undefined) {
      urlGet += '&refine.aca_etab_lib=' + this.selectedAcademy;
    }
    if(this.selectedRegion != undefined) {
      urlGet += '&refine.reg_ins_lib=' + this.selectedRegion;
    }
    if(this.selectedDepartment != undefined) {
      urlGet += '&refine.dep_ins_lib=' + this.selectedDepartment;
    }
    if(this.selectedCity != undefined) {
      urlGet += '&refine.uucr_ins_lib=' + this.selectedCity;
    }
    if(this.selectedDiplomaT != undefined) {
      urlGet += '&refine.diplome_rgp=' + this.selectedDiplomaT;
    }

    console.log(urlGet);

    this.http.get(urlGet)
    .subscribe((res: any[]) =>{
       this.resSearch = res[`records`];
       console.log(this.resSearch);
    });  

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
    console.log(`Init finished`);
  }

}
