import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})

export class SchoolsComponent implements OnInit {

  private schools  = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getAllSchools() {
  	this.http.get(`http://localhost:3000/school`)
  .subscribe((res: any[]) =>{
      console.log(res);
      this.schools = res;
       });
  }

}
