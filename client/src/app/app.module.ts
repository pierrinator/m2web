import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule,
   MatIconModule, MatListModule, MatFormFieldModule, MatCardModule, MatChipsModule,
    MatSelectModule, MatAutocompleteModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AccountComponent } from './account/account.component';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { SearchComponent } from './search/search.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SchoolsComponent } from './schools/schools.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './auth-guard.service';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchComponent},
  {path: 'user', component: UserComponent},
  {path: 'schools', component: SchoolsComponent, canActivate: [AuthGuardService]}


];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AccountComponent,
    UserComponent,
    LoginComponent,
    SchoolsComponent,
    SearchComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    }),
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    }),
    NgbModule.forRoot() // <---
  ],
  providers: [
    GoogleMapsAPIWrapper, AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
