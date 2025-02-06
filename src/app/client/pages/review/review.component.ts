import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { UserStorageService } from 'src/app/basic/service/storage/user-storage.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  bookId: number;
  validateForm!: FormGroup; 

  constructor(
    private fb: FormBuilder, 
    private clientService: ClientService,
    private notification: NzNotificationService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Access route parameters from the current route
    this.activatedroute.params.subscribe(params => {
      this.bookId = +params['bookId']; // Use '+' to convert to a number
      console.log('Book ID:', this.bookId); // Debug log
    });
    
    // Initialize the form
    this.validateForm = this.fb.group({
      rating: [null, Validators.required],
      review: [null, Validators.required]
    });
  }

  giveReview() {
    const reviewDTO = {
      rating: this.validateForm.get("rating").value,
      review: this.validateForm.get("review").value,
      userId: UserStorageService.getUserId(),
      bookId: this.bookId
    };

    this.clientService.giveReview(reviewDTO).subscribe(() => {
      this.notification.success('Success', 'Review added successfully', {nzDuration: 5000});
      this.router.navigateByUrl('/client/bookings');
    }, (error: { error: any; }) => {
      this.notification.error('Error', 'Operation Failed', {nzDuration: 5000});
      console.log('Error:', error);
      console.log('Review DTO:', reviewDTO);
    });
  }
}