import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { UserStorageService } from 'src/app/basic/service/storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080/';
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


      createAuthorizationHeader() {
        let authHeaders: HttpHeaders = new HttpHeaders();
        return authHeaders.set(
          'Authorization',
          'Bearer ' + UserStorageService.getToken()
        )
      }


}
