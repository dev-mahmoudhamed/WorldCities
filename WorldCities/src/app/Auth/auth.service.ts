import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './login-request';
import { LoginResult } from './login-result';
import { RegisterRequest } from './register-request';
import { RegisterResult } from './register-result';


@Injectable({
    providedIn: 'root',
})

export class AuthService {
    public username?: string;


    constructor(protected http: HttpClient) {
    }

    private tokenKey: string = "token";
    private _authStatus = new Subject<boolean>();
    public authStatus = this._authStatus.asObservable();

    isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    init(): void {
        if (this.isAuthenticated()) {
            this.setAuthStatus(true);
        }
    }

    login(item: LoginRequest): Observable<LoginResult> {
        var url = environment.baseUrl + "api/Account/Login";
        return this.http.post<LoginResult>(url, item)
            .pipe(tap(loginResult => {
                this.username = item.email;

                if (loginResult.success && loginResult.token) {
                    localStorage.setItem(this.tokenKey, loginResult.token);
                    this.setAuthStatus(true);
                }
            }))
    }

    register(item: RegisterRequest): Observable<RegisterResult> {
        var url = environment.baseUrl + "api/Account/Register";
        return this.http.post<RegisterResult>(url, item);
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        this.setAuthStatus(false);
    }

    private setAuthStatus(isAuthenticated: boolean): void {
        this._authStatus.next(isAuthenticated);
    }
}