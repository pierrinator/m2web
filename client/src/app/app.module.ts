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
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { SchoolsComponent } from './schools/schools.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './auth-guard.service';
import { RedirectLoginService } from './redirect-login.service';

export function jwtTokenGetter() {
  return localStorage.getItem('access_token');;
}


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [RedirectLoginService]},
  {path: 'search', component: SearchComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuardService]},
  {path: 'schools', component: SchoolsComponent, canActivate: [AuthGuardService]}


];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AccountComponent,
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
        tokenGetter: jwtTokenGetter
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
    GoogleMapsAPIWrapper, AuthGuardService, RedirectLoginService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
