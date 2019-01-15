import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {School} from './schools.interface';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})

export class SchoolsComponent implements OnInit {

  private schools: School[] = [];

  displayedColumns: string[] = ['checked', 'school_name', 'main_field', 'sub_field', 'academy',
   'region', 'department', 'city', 'type_diploma', 'diploma_name'];

  constructor(private http: HttpClient) { }

  getAllSchools() {
    this.http.get(`http://localhost:3000/school`)
    .subscribe((res: any[]) =>{
      this.schools = [];
      let schoolsGet = res;
      for(let item of schoolsGet) {
        let school = {checked: false, school_id: item.school_id, school_name: item.school_name, main_field: item.main_field, sub_field: item.sub_field, academy: item.academy, region: item.region, department: item.department, city: item.city, type_diploma: item.type_diploma, diploma_name: item.diploma_name};

        this.schools.push(school);
      }
    });
  }

  deleteSchools() {
    let url = 'http://localhost:3000/school/';
    let cpt = 0;

    for(let item of this.schools) {
      if(item.checked) {
         cpt++;
      }
    }
    for(let item of this.schools) {
      if(item.checked) {
        this.http.delete(url+item.school_id)
       .subscribe((res: any[]) =>{
          cpt--;
          if(cpt <= 0)
            this.getAllSchools();
        }); 
      }
    }
    

  }

  ngOnInit() {
    this.getAllSchools();
  }
  
}