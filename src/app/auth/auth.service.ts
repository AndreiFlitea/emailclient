import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean;
}
interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SignInResponse {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject<any>(null);
  rootUrl = 'https://api.angular-email.com';
  username = '';

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: any) {
    return this.http
      .post<SignupResponse>(this.rootUrl + '/auth/signup', credentials) //  withCredentials: true   HUGE GOTCHA!!!!!!!!!!!!!!!
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedinResponse>(this.rootUrl + '/auth/signedin') //HUGE GOTCHA!!!!!!!!!!!!!!!
      .pipe(
        tap(({ authenticated, username }) => {
          if (authenticated === true) {
            this.signedin$.next(authenticated); // the header doesn`t change any more after reload
            this.username = username;
          }
        })
      );
  }

  signOut() {
    return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signIn(signin: any) {
    return this.http
      .post<SignInResponse>(this.rootUrl + '/auth/signin', signin)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
