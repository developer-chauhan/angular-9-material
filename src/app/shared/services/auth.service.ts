import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    endpoint: string = 'http://localhost:4000/api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    currentUser = {};

    constructor(
        private http: HttpClient,
        public router: Router
    ) {
    }

    // Sign-up
    signUp(user): Observable<any> {
        let api = `${this.endpoint}/register-user`;
        return this.http.post(api, user)
            .pipe(
                catchError(this.handleError)
            )
    }

    // Sign-in
    signIn(user) {
        // return this.http.post<any>(`${this.endpoint}/signin`, user)
        //     .subscribe((res: any) => {
        //         localStorage.setItem('access_token', res.token)
        //         this.router.navigate(['dashboard']);
        //     })
        localStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhbmphbiIsImlhdCI6MTUxNjIzOTAyMn0.bWmoJyDUSaf70pXhyYE_wnOkIM3zRRqBSoHw5f9Tnp4');
        this.currentUser = 'Ranjan';
        this.router.navigate(['dashboard'])
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return (authToken !== null) ? true : false;
    }

    doLogout() {
        let removeToken = localStorage.removeItem('access_token');
        if (removeToken == null) {
            this.router.navigate(['/login']);
        }
    }

    // User profile
    getUserProfile(id): Observable<any> {
        let api = `${this.endpoint}/user-profile/${id}`;
        return this.http.get(api, { headers: this.headers }).pipe(
            map((res: Response) => {
                return res || {}
            }),
            catchError(this.handleError)
        )
    }

    // Error 
    handleError(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(msg);
    }
}