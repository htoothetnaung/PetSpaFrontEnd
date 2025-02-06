import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from 'src/app/basic/service/storage/user-storage.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent {

  adId = this.activatedroute.snapshot.params['adId'];
  avatarUrl: any; 
  ad: any;
  validateForm!: FormGroup; 
  reviews: any; 

  constructor(private clientService: ClientService, private activatedroute: ActivatedRoute,

    private notification: NzNotificationService, 
    private router: Router, 
    private fb: FormBuilder
  ){
  
  }

  ngOnInit(){
    this.validateForm = this.fb.group({
      bookDate: [null, [Validators.required]],
    })
    this.getAdDetailsByAdId(); 

    console.log('Stored s_user:', localStorage.getItem('s_user'));
  }

  getAdDetailsByAdId()
  {
    this.clientService.getAdDetailsByAdId(this.adId).subscribe(res => {
      console.log(res); 
      this.avatarUrl = 'data:image/jpeg;base64,' + res.adDTO.returnedImg;
      this.ad = res.adDTO;
      this.reviews = res.reviewDTOList
    })
  }

  bookService() {
    const userId = UserStorageService.getUserId();
    if (!userId) {
      this.notification.error('ERROR', 'User ID not found. Please log in again.', { nzDuration: 5000 });
      return; // Stop further execution if userId is null
    }
  
    const bookServiceDTO = {
      bookDate: this.validateForm.get(['bookDate']).value,
      adId: this.adId,
      userId: userId, // Ensure userId is not null
    };
  
    console.log('Booking DTO:', bookServiceDTO); // Debugging
  
    this.clientService.bookService(bookServiceDTO).subscribe(
      (res) => {
        this.notification.success('SUCCESS', 'Service booked successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/client/bookings');
        console.log('Booking response:', res); // Debugging
      },
      (err) => {
        console.error('Booking error:', err); // Debugging
      }
    );
  }

}
