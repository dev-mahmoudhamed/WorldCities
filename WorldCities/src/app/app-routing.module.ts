import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CitiesComponent } from './Components/cities/cities.component';
import { CityEditComponent } from './Components/cities/city-edit.component';
import { CountriesComponent } from './Components/countries/countries.component';
import { CountryEditComponent } from './Components/countries/country-edit.component';
import { LoginComponent } from './Auth/login.component';
import { AuthGuard } from './Auth/auth.guard';
import { RegisterComponent } from './Auth/register.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'cities', component: CitiesComponent },
    { path: 'city/:id', component: CityEditComponent, canActivate: [AuthGuard] },
    { path: 'city', component: CityEditComponent, canActivate: [AuthGuard] },

    { path: 'countries', component: CountriesComponent },
    { path: 'country/:id', component: CountryEditComponent, canActivate: [AuthGuard] },
    { path: 'country', component: CountryEditComponent, canActivate: [AuthGuard] },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }