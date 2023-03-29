import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { CitiesComponent } from './Components/cities/cities.component';
import { AngularMaterialModule } from './angular-material.module';
import { ModelFormComponent } from './Components/model-form/model-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CityEditComponent } from './Components/cities/city-edit.component';
import { CountriesComponent } from './Components/countries/countries.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    CitiesComponent,
    ModelFormComponent,
    CityEditComponent,
    CountriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }