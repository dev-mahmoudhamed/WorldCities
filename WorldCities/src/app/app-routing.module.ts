import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CitiesComponent } from './Components/cities/cities.component';
import { CityEditComponent } from './Components/cities/city-edit.component';
import { CountriesComponent } from './Components/countries/countries.component';
import { CountryEditComponent } from './Components/countries/country-edit.component';


const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'cities', component: CitiesComponent },
    { path: 'city/:id', component: CityEditComponent },
    { path: 'city', component: CityEditComponent },

    { path: 'countries', component: CountriesComponent },
    { path: 'country/:id', component: CountryEditComponent },
    { path: 'country', component: CountryEditComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }