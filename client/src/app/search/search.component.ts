import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private schools  = [];

  constructor(private http: HttpClient) { }

  getAllSchools() {
    console.log(`test`);
     this.http.get('https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&rows=1000&sort=-rentree_lib&facet=gd_disciscipline_lib&facet=discipline_lib&facet=aca_etab_lib&facet=reg_ins_lib&facet=dep_ins_lib&facet=diplome_rgp&facet=uucr_ins_lib&facet=uucr_ins&facet=libelle_intitule_1&facet=etablissement_lib' )
  .subscribe((res: any[]) =>{
       console.log(res);
       this.schools = res[`records`];
  });
  }

  ngOnInit() {
  }

}
