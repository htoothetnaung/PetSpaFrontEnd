import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent {

  bookings: any; 

  constructor(private companyService: CompanyService,
    private notification: NzNotificationService, 
  ) { }

  ngOnInit(){
    this.getAllAdBookings();
  }

  getAllAdBookings(){
    this.companyService.getAllAdBookings().subscribe(res => {
      console.log(res);
      this.bookings = res;
    })
  }

  changeBookingStatus(bookingId: number, status: String){
    this.companyService.changeBookingStatus(bookingId, status).subscribe(res => {
      this.notification.success('Success', `Booking status changed successfully`, {nzDuration: 5000});
      this.getAllAdBookings();
    }, error => {
      this.notification.error('Error', `Booking status change failed`, {nzDuration: 5000});
      console.log(error.message);
    })

  }




}




