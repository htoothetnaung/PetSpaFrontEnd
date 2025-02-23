import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/basic/service/storage/user-storage.service';
import { CONFIG } from 'src/app/config';

// const BASIC_URL = 'http://localhost:8080/';
const BASIC_URL = CONFIG.API_BASE_URL;


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  postAd(adDTO:any) : Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `api/company/ad/${userId}`, adDTO, {
      headers: this.createAuthorizationHeader()
    });

  }


  getAllAdsByUserId() : Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/company/ads/${userId}`, {
      headers: this.createAuthorizationHeader()
    });

  }



  getAdById(adId: any) : Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/company/ad/${adId}`, {
      headers: this.createAuthorizationHeader()
    });

  }

  getAllAdBookings() : Observable<any> {
    const companyId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/company/bookings/${companyId}`, {
      headers: this.createAuthorizationHeader()
    });

  }

  changeBookingStatus(bookingId: number, status: String) : Observable<any> {
    return this.http.get(BASIC_URL + `api/company/booking/${bookingId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });

  }

  updateAd(adId:any, adDTO:any) : Observable<any> {

    return this.http.put(BASIC_URL + `api/company/ad/${adId}`, adDTO, {
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

  deleteAd(adId: any){
    return this.http.delete(BASIC_URL + `api/company/ad/${adId}`, {
      headers: this.createAuthorizationHeader()
    });
  }


}
