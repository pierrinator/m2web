import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule,
   MatIconModule, MatListModule, MatFormFieldModule, MatCardModule, MatChipsModule,
    MatSelectModule, MatAutocompleteModule, MatProgressSpinnerModule} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AccountComponent } from './account/account.component';
import {RouterModule, Routes} from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { SearchComponent } from './search/search.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';





const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchComponent},
  {path: 'user', component: UserComponent},



];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AccountComponent,
    UserComponent,
    LoginComponent,
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
    FormsModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
