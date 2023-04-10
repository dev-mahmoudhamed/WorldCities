import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CountryEditComponent } from './Components/countries/country-edit.component';
import { LoginComponent } from './Auth/login.component';
import { AuthInterceptor } from './Auth/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    CitiesComponent,
    ModelFormComponent,
    CityEditComponent,
    CountriesComponent,
    CountryEditComponent,
    LoginComponent,
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
