import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, Observable, throwError } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { CONFIG } from 'src/app/config';


// const BASIC_URL = "http://localhost:8080/";
const BASIC_URL = CONFIG.API_BASE_URL;

export const AUTH_HEADER = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  registerClient(signupRequestDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + 'client/sign-up', signupRequestDTO);
  }

  registerCompany(signupRequestDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + 'company/sign-up', signupRequestDTO);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(BASIC_URL + 'authenticate', { username, password }, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          try {
            console.log('Response Body:', res.body);

            this.userStorageService.saveUser(res.body);

            const authHeader = res.headers.get(AUTH_HEADER);
            if (!authHeader) {
              throw new Error('Authorization header is missing in the response');
            }

            const bearerToken = authHeader.substring(7, authHeader.length);
            if (!bearerToken) {
              throw new Error('Bearer token is invalid or missing');
            }

            console.log('Extracted Bearer Token:', bearerToken);

            this.userStorageService.saveToken(bearerToken);
            return res;
          } catch (error) {
            const err = error as any;
            console.error('Error processing response:', err.message);
            throw error; // Re-throw error to be caught in the catch below if needed
          }
        }),
        catchError((error: any) => {
          console.error('HTTP Request Error:', error.message);
          console.error('Error Details:', error);
          // Optionally re-throw or handle specific error cases here
          return throwError('Failed to authenticate. Please try again later.');
        })
      );
  }
}
