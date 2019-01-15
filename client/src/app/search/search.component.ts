/// <reference types="googlemaps" />
import { Component, Input, ViewChild, NgZone, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {Search} from './search.interface';
import {Router} from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { LocationsService } from '../locations.service';
import { MapsService } from '../maps.service';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
declare const google: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  public searchControl: FormControl;

  @ViewChild('search') public searchElementRef: ElementRef;

  public lat: number;
  public lng: number;
  public zoom: number;

  public openedWindow: number;
  
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
   'region', 'department', 'city', 'type_diploma', 'diploma_name'];

   static initOptions = false;

  constructor(private http: HttpClient,private locationService: LocationsService,
    private mapApiLoader: MapsAPILoader,
    private mapsService: MapsService,  private ngZone: NgZone, private router: Router) {
       }

  filter() {
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
    let cpt = 0;
    for(let item of this.resSearch) {
      if(item.checked) {
         cpt++;
      }
    }

    for(let item of this.resSearch) {
      if(item.checked) {
        let school = {school_name: item.school_name, main_field: item.main_field, sub_field: item.sub_field, academy: item.academy, region: item.region, department: item.department, city: item.city, type_diploma: item.type_diploma, diploma_name: item.diploma_name};

        this.http.post('http://localhost:3000/school', school)
       .subscribe((res: any) =>{
          console.log(res);
          cpt--;
          if(cpt <= 0)
            this.router.navigate(['/schools']);
        }); 
      }
    }
  }

  ngOnInit() {

    this.searchControl = new FormControl();
    this.lat = this.mapsService.lat;
    this.lng = this.mapsService.lng;
    this.zoom = this.mapsService.zoom;

    this.setCurrentPosition();
    this.mapApiLoader.load();

  
    this.mapsService.newCoordinators.subscribe(
      (coords: { lat: number, lng: number, zoom: number }) => {
        if (coords) {
          this.lat = coords.lat;
          this.lng = coords.lng;
          this.zoom = coords.zoom;
          this.mapApiLoader.load();
        }
      }
    );
    // Open window after click on panel
    this.mapsService.openWindow.subscribe(
      index => {
        this.openedWindow = +index;
      }
    );

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

    
  }

  mapClicked($event: MouseEvent) {
    console.log($event);
  }

  clickedMarker(label: string, index: number) {
    console.log(`Clicked the marker: ${label || index}`);
    this.openedWindow = index;
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = this.mapsService.lat = position.coords.latitude;
        this.lng = this.mapsService.lng = position.coords.longitude;
        this.zoom = 10;
      });
    }

    // @Todo: resort the locations
  }

  isInfoWindowOpen(index: number) {
    return this.openedWindow === index;
  }

  ngAfterViewInit(): void {
    const test = google.maps.places.FindPlaceFromQueryRequest("Bordeaux");

  }

}
