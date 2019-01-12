import { Component, OnInit } from '@angular/core';
import {SchoolsService} from './schools.service';
import {School} from './schools.interface';
import {Router} from "@angular/router";

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {

  Schools: School[];

  constructor(private schoolsservice: SchoolsService, private router: Router) { }

  ngOnInit() {
    this.schoolsservice
      .getSchools().subscribe((data: School[]) => {
        this.Schools = data;
      });
  }

  goToAddMatiere () {
    this.router.navigateByUrl('/ajout-matiere');
  }

}
