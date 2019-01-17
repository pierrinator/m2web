/// <reference types="@types/googlemaps" />
import { Component, Input, ViewChild, NgZone, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {Search} from './search.interface';
import {Router} from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { JwtService } from '../jwt.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public input: HTMLInputElement;

  @ViewChild("search")
  public searchElementRef: ElementRef;
 
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

  static initNames  = [];
  static initMainfields  = [];
  static initSubfields  = [];
  static initAcademies  = [];
  static initRegions  = [];
  static initDepartments  = [];
  static initCities  = [];
  static initDiploma_types  = [];

  private resSearch: Search[] = [];

  private url =  `https://data.enseignementsup-recherche.gouv.fr/api/v2/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/aggregates?select=`;

  displayedColumns: string[] = ['checked', 'school_name', 'main_field', 'sub_field', 'academy',
   'region', 'department', 'city', 'type_diploma', 'diploma_name', 'actions'];

   static initOptions = false;

  constructor(private myElement: ElementRef, private http: HttpClient, private ngZone: NgZone,
     private mapsAPILoader: MapsAPILoader, private router: Router, private auth: JwtService) {
       }

  filter() {
    let urlGet = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&rows=50&sort=-rentree_lib&facet=gd_disciscipline_lib&facet=discipline_lib&facet=aca_etab_lib&facet=reg_ins_lib&facet=dep_ins_lib&facet=diplome_rgp&facet=uucr_ins_lib&facet=libelle_intitule_1&facet=etablissement_lib';

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


    this.http.get(urlGet)
    .subscribe((res: any[]) =>{
      this.resSearch = [];
      let resTmp = res[`records`];
      for(let item of resTmp) {
        if(item.fields.etablissement_lib != undefined && item.fields.gd_disciscipline_lib != undefined && item.fields.discipline_lib != undefined && item.fields.aca_etab_lib != undefined && item.fields.reg_ins_lib != undefined && item.fields.dep_ins_lib != undefined && item.fields.uucr_ins_lib != undefined && item.fields.diplome_rgp && item.fields.libelle_intitule_1 != undefined) {
        
          let school = {checked: false, school_name: item.fields.etablissement_lib, main_field: item.fields.gd_disciscipline_lib, sub_field: item.fields.discipline_lib, academy: item.fields.aca_etab_lib, region: item.fields.reg_ins_lib, department: item.fields.dep_ins_lib, city: item.fields.uucr_ins_lib, type_diploma: item.fields.diplome_rgp, diploma_name: item.fields.libelle_intitule_1};

          this.resSearch.push(school);
        }
        
      }
    });  

  }

  saveSchools() {
    if (this.auth.loggedIn()!=true){
      return alert('Impossible de sauvegarder : vous n\'êtes pas connecté.');
    }
    let cpt = 0;
    for(let item of this.resSearch) {
      if(item.checked) {
         cpt++;
      }
    }

    for(let item of this.resSearch) {
      if(item.checked) {
        let school = {school_name: item.school_name, main_field: item.main_field, sub_field: item.sub_field, academy: item.academy, region: item.region, department: item.department, city: item.city, type_diploma: item.type_diploma, diploma_name: item.diploma_name, user_id: this.auth.getId()};

        this.http.post('https://frozen-dusk-46362.herokuapp.com/school', school)
       .subscribe((res: any) =>{
          cpt--;
          if(cpt <= 0)
            this.router.navigate(['/schools']);
        }); 
      }
    }
  }

  localize(s: Search) {
    this.searchControl.setValue(s.school_name);
    let el = this.myElement.nativeElement.querySelector('map');
    el.scrollIntoView();
  }

  ngOnInit() {

    if(!SearchComponent.initOptions) {
      this.http.get((this.url) + `etablissement_lib&group_by=etablissement_lib`)
      .subscribe((res: any[]) =>{
        SearchComponent.initNames = res[`aggregations`];
        this.names = SearchComponent.initNames;
       });
      this.http.get((this.url) + `gd_disciscipline_lib&group_by=gd_disciscipline_lib`)
      .subscribe((res: any[]) =>{
         SearchComponent.initMainfields = res[`aggregations`];
         this.mainfields = SearchComponent.initMainfields;
      });
      this.http.get((this.url) + `discipline_lib&group_by=discipline_lib`)
      .subscribe((res: any[]) =>{
        SearchComponent.initSubfields = res[`aggregations`];
        this.subfields = SearchComponent.initSubfields;
      });
      this.http.get((this.url) + `aca_etab_lib&group_by=aca_etab_lib`)
      .subscribe((res: any[]) =>{
        SearchComponent.initAcademies = res[`aggregations`];
        this.academies = SearchComponent.initAcademies;
      });
      this.http.get((this.url) + `reg_ins_lib&group_by=reg_ins_lib`)
      .subscribe((res: any[]) =>{
        SearchComponent.initRegions = res[`aggregations`];
        this.regions = SearchComponent.initRegions;
      });
      this.http.get((this.url) + `reg_ins_lib&group_by=dep_ins_lib`)
      .subscribe((res: any[]) =>{
        SearchComponent.initDepartments = res[`aggregations`];
        this.departments = SearchComponent.initDepartments;
      });
      this.http.get((this.url) + `reg_ins_lib&group_by=uucr_ins_lib`)
      .subscribe((res: any[]) =>{
        SearchComponent.initCities = res[`aggregations`];
        this.cities = SearchComponent.initCities;
      });
      this.http.get((this.url) + `diplome_rgp&group_by=diplome_rgp`)
      .subscribe((res: any[]) =>{
        SearchComponent.initDiploma_types = res[`aggregations`];
        this.diploma_types = SearchComponent.initDiploma_types;
      });

      SearchComponent.initOptions = true;

    }
    else {
      this.names = SearchComponent.initNames;
      this.mainfields = SearchComponent.initMainfields;
      this.subfields = SearchComponent.initSubfields;
      this.academies = SearchComponent.initAcademies;
      this.regions = SearchComponent.initRegions;
      this.departments = SearchComponent.initDepartments;
      this.cities = SearchComponent.initCities;
      this.diploma_types = SearchComponent.initDiploma_types;
    }
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }



  handler_school_name(o: any) {
    let result = [];
    this.http.get((this.url) + `aca_etab_lib&group_by=aca_etab_lib` + '&where=etablissement_lib%3D%22'+o.etablissement_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedAcademy = result[0].aca_etab_lib;
      });
    this.http.get((this.url) + `reg_ins_lib&group_by=reg_ins_lib` + '&where=etablissement_lib%3D%22'+o.etablissement_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedRegion = result[0].reg_ins_lib;
      });
    this.http.get((this.url) + `dep_ins_lib&group_by=dep_ins_lib` + '&where=etablissement_lib%3D%22'+o.etablissement_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedDepartment = result[0].dep_ins_lib;
      });
    this.http.get((this.url) + `uucr_ins_lib&group_by=uucr_ins_lib` + '&where=etablissement_lib%3D%22'+o.etablissement_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedCity = result[0].uucr_ins_lib;
      });
  }

  handler_main_field(o: any) {
    if(o == undefined) {
      this.subfields = SearchComponent.initSubfields;
    }
    else{
      this.selectedSubfield = undefined;
      this.http.get((this.url) + `discipline_lib&group_by=discipline_lib` + '&where=gd_disciscipline_lib%3D%22'+o.gd_disciscipline_lib+'%22')
      .subscribe((res: any[]) =>{
        this.subfields = res['aggregations'];
      });
    }
  }
  
  handler_sub_field(o: any) {
    let result = [];
    this.http.get((this.url) + `gd_disciscipline_lib&group_by=gd_disciscipline_lib` + '&where=discipline_lib%3D%22'+o.discipline_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedMainfield = result[0].gd_disciscipline_lib;
      });
  }

  handler_academy(o: any) {
    if(o == undefined) {
      this.names = SearchComponent.initNames;
      this.cities = SearchComponent.initCities;
      this.departments = SearchComponent.initDepartments;
      this.regions = SearchComponent.initRegions;
    }

    else {
      this.selectedName = undefined;
      this.selectedCity = undefined;
      this.selectedDepartment = undefined;
      this.selectedRegion = undefined;

      this.http.get((this.url) + `etablissement_lib&group_by=etablissement_lib` + '&where=aca_etab_lib%3D%22'+o.aca_etab_lib+'%22')
      .subscribe((res: any[]) =>{
        this.names = res['aggregations'];
      });
      this.http.get((this.url) + `uucr_ins_lib&group_by=uucr_ins_lib` + '&where=aca_etab_lib%3D%22'+o.aca_etab_lib+'%22')
      .subscribe((res: any[]) =>{
        this.cities = res['aggregations'];
      });
      this.http.get((this.url) + `dep_ins_lib&group_by=dep_ins_lib` + '&where=aca_etab_lib%3D%22'+o.aca_etab_lib+'%22')
      .subscribe((res: any[]) =>{
        this.departments = res['aggregations'];
      });
      this.http.get((this.url) + `reg_ins_lib&group_by=reg_ins_lib` + '&where=aca_etab_lib%3D%22'+o.aca_etab_lib+'%22')
      .subscribe((res: any[]) =>{
        this.regions = res['aggregations'];
      });
       
    }
    
  }  

  handler_region(o: any) {
    if(o == undefined) {
      this.names = SearchComponent.initNames;
      this.cities = SearchComponent.initCities;
      this.departments = SearchComponent.initDepartments;
    }

    else {
      this.selectedName = undefined;
      this.selectedCity = undefined;
      this.selectedDepartment = undefined;

      let result = [];
    this.http.get((this.url) + `aca_etab_lib&group_by=aca_etab_lib` + '&where=reg_ins_lib%3D%22'+o.reg_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedAcademy = result[0].aca_etab_lib;
      });

      this.http.get((this.url) + `etablissement_lib&group_by=etablissement_lib` + '&where=reg_ins_lib%3D%22'+o.reg_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        this.names = res['aggregations'];
      });
      this.http.get((this.url) + `uucr_ins_lib&group_by=uucr_ins_lib` + '&where=reg_ins_lib%3D%22'+o.reg_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        this.cities = res['aggregations'];
      });
      this.http.get((this.url) + `dep_ins_lib&group_by=dep_ins_lib` + '&where=reg_ins_lib%3D%22'+o.reg_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        this.departments = res['aggregations'];
      });
    }
    
  }  

  handler_department(o: any) {
    if(o == undefined) {
      this.names = SearchComponent.initNames;
      this.cities = SearchComponent.initCities;
    }
    else {
      this.selectedName = undefined;
      this.selectedCity = undefined;

      let result = [];
    this.http.get((this.url) + `aca_etab_lib&group_by=aca_etab_lib` + '&where=dep_ins_lib%3D%22'+o.dep_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedAcademy = result[0].aca_etab_lib;
      });
    this.http.get((this.url) + `reg_ins_lib&group_by=reg_ins_lib` + '&where=dep_ins_lib%3D%22'+o.dep_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedRegion = result[0].reg_ins_lib;
      });


      this.http.get((this.url) + `etablissement_lib&group_by=etablissement_lib` + '&where=dep_ins_lib%3D%22'+o.dep_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        this.names = res['aggregations'];
      });
      this.http.get((this.url) + `uucr_ins_lib&group_by=uucr_ins_lib` + '&where=dep_ins_lib%3D%22'+o.dep_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        this.cities = res['aggregations'];
      });
    }
    
  }

  handler_city(o: any) {
    if(o == undefined) {
      this.names = SearchComponent.initNames;
    }
    else{
      this.selectedName = undefined;
      let result = [];
    this.http.get((this.url) + `aca_etab_lib&group_by=aca_etab_lib` + '&where=uucr_ins_lib%3D%22'+o.uucr_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedAcademy = result[0].aca_etab_lib;
      });
    this.http.get((this.url) + `reg_ins_lib&group_by=reg_ins_lib` + '&where=uucr_ins_lib%3D%22'+o.uucr_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedRegion = result[0].reg_ins_lib;
      });
    this.http.get((this.url) + `dep_ins_lib&group_by=dep_ins_lib` + '&where=uucr_ins_lib%3D%22'+o.uucr_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        result = res['aggregations'];
        this.selectedDepartment = result[0].dep_ins_lib;
      });

      this.http.get((this.url) + `etablissement_lib&group_by=etablissement_lib` + '&where=uucr_ins_lib%3D%22'+o.uucr_ins_lib+'%22')
      .subscribe((res: any[]) =>{
        this.names = res['aggregations'];
      });
    }

    
  }

}
