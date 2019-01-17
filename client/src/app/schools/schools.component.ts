import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {School} from './schools.interface';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})

export class SchoolsComponent implements OnInit {

  public schools: School[] = [];

  displayedColumns: string[] = ['checked', 'school_name', 'main_field', 'sub_field', 'academy',
   'region', 'department', 'city', 'type_diploma', 'diploma_name'];

  constructor(private http: HttpClient, private auth: JwtService) { }

  getAllSchools() {
    this.http.get(`https://frozen-dusk-46362.herokuapp.com/school/`+this.auth.getId())
    .subscribe((res: any[]) =>{
      this.schools = [];
      let schoolsGet = res;
      for(let item of schoolsGet) {
        let school = {checked: false, school_id: item.school_id, school_name: item.school_name, main_field: item.main_field, sub_field: item.sub_field, academy: item.academy, region: item.region, department: item.department, city: item.city, type_diploma: item.type_diploma, diploma_name: item.diploma_name, user_id: item.user_id};

        this.schools.push(school);
      }
    });
  }

  deleteSchools() {
    let url = 'https://frozen-dusk-46362.herokuapp.com/school/';
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