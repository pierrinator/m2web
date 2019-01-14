import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})

export class SchoolsComponent implements OnInit {

  private schools  = [];

  displayedColumns: string[] = ['school_id', 'school_name', 'main_field', 'sub_field', 'academy',
   'region', 'department', 'city', 'type_diploma', 'diploma_name'];
   dataSource = new MatTableDataSource<any>(this.schools);
   selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor(private http: HttpClient) { }

  getAllSchools() {
    this.http.get(`http://localhost:3000/school`)
    .subscribe((res: any[]) =>{
      console.log(res);
      this.schools = res;
    });
  }

  deleteSchools() {
    this.getAllSchools();
  }

  ngOnInit() {
    this.getAllSchools();
  }
  
}
