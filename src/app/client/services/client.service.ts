import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { UserStorageService } from 'src/app/basic/service/storage/user-storage.service';
import { CONFIG } from 'src/app/config';

// const BASIC_URL = 'http://localhost:8080/';
const BASIC_URL = CONFIG.API_BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,) { }



    getAllAds() : Observable<any> {

      return this.http.get(BASIC_URL + `api/client/ads`, {
        headers: this.createAuthorizationHeader()
      });

    }

    searchAdByName(name:any) : Observable<any> {

      return this.http.get(BASIC_URL + `api/client/search/${name}`, {
        headers: this.createAuthorizationHeader()
      });

    }

    getAdDetailsByAdId(adId:any) : Observable<any> {

      return this.http.get(BASIC_URL + `api/client/ad/${adId}`, {
        headers: this.createAuthorizationHeader()
      });

    }

    bookService(bookDTO:any): Observable<any> {

      return this.http.post(BASIC_URL + `api/client/book-service`, bookDTO, {
        headers: this.createAuthorizationHeader()
      })
    }

    getMyBookings(): Observable<any> {
      const userId = UserStorageService.getUserId();

      return this.http.get(BASIC_URL + `api/client/my-bookings/${userId}`, {
        headers: this.createAuthorizationHeader()
      })
    }


    giveReview(reviewDTO:any): Observable<any> {

      return this.http.post(BASIC_URL + `api/client/review`, reviewDTO, {
        headers: this.createAuthorizationHeader()
      })
    }

      createAuthorizationHeader() {
        let authHeaders: HttpHeaders = new HttpHeaders();
        return authHeaders.set(
          'Authorization',
          'Bearer ' + UserStorageService.getToken()
        )
      }


}
