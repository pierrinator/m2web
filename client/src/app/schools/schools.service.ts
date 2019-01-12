import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";




@Injectable()
export class SchoolsService {
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  url = 'http://localhost:3000';
  getSchools() {
    return this.http.get(`${this.url}/school`);
  }

  createSchool(data) {
    this.http.post(`${this.url}/school`, data)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('Votre école a été ajoutée', 'Success');
          this.router.navigateByUrl('/school');
        },
        err => {
          console.log('Error occured:' , err);
          this.toastr.error(err.message, 'Error occured');
        }
      );
  }
}
