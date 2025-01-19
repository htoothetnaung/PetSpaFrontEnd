import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../service/auth/auth.service';
import { nzModalAnimations } from 'ng-zorro-antd/modal';
import { UserStorageService } from '../../service/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router,

  ) {


   }

   ngOnInit(){
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })

  }
  submitForm() {
    this.authService
      .login(
        this.validateForm.get('userName')?.value,
        this.validateForm.get('password')?.value
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if(UserStorageService.isClientLoggedIn()){
            this.router.navigateByUrl('client/dashboard');
          }else if(UserStorageService.isCompanyLoggedIn()){
            this.router.navigateByUrl('company/dashboard');
          }
        },
        error: (error: { error: any }) => {
          this.notification.error('Error', `Login Failed`, { nzDuration: 5000 });
        },
      });
  }
  }





