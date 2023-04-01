import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from './country';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {
  title?: string;
  form!: FormGroup;
  country?: Country;
  id?: number;
  countries?: Country[];

  constructor(
    private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}