import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent {
[x: string]: any;

  validateForm!: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;


  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService
  ){

  }

  ngOnInit(){
      this.validateForm = this.fb.group({
        serviceName: [null, [Validators.required]],
        description: [null, [Validators.required]],
        price: [null, [Validators.required]],
      })
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0]; // FileList object
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(this.selectedFile);
  }

  postAd(){
    const formData = new FormData();

    formData.append('img' , this.selectedFile);
    formData.append('serviceName', this.validateForm.get('serviceName')?.value); // in youtube tuto question mark does nor include
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);

    this.companyService.postAd(formData).subscribe(res => {
      this.notification.success('Success', `Ad created successfully`, {nzDuration: 5000});
      this.router.navigateByUrl('company/ads');
    }, error => {
      this.notification.error('ERROR', `${error.error}`, {nzDuration: 5000});
    })

  }
}
