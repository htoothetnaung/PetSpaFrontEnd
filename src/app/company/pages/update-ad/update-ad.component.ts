 import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.scss']
})
export class UpdateAdComponent {
  adId: any = this.activatedroute.snapshot.params['id'];
  [x: string]: any;

    validateForm!: FormGroup;
    selectedFile: File | null;
    imagePreview: string | ArrayBuffer | null;
    existingImage: string | null =null ;

    imgChanged = false;


  constructor(private companyService: CompanyService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    ) { }



  getAdById() {
    this.companyService.getAdById(this.adId).subscribe(res => {
      console.log(res);
      this.validateForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
    })
  }



  ngOnInit(){
        this.validateForm = this.fb.group({
          serviceName: [null, [Validators.required]],
          description: [null, [Validators.required]],
          price: [null, [Validators.required]],

        })
        this.getAdById()
    }

    onFileSelected(event: any){
      this.selectedFile = event.target.files[0]; // FileList object
      this.previewImage();

      this.existingImage = null;
      this.imgChanged = true; 
    }

    previewImage(){
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }

      reader.readAsDataURL(this.selectedFile);
    }

    updateAd(){
      const formData = new FormData();

      if(this.imgChanged && this.selectedFile){
        formData.append('img' , this.selectedFile);
      }


      formData.append('serviceName', this.validateForm.get('serviceName')?.value); // in youtube tuto question mark does nor include
      formData.append('description', this.validateForm.get('description')?.value);
      formData.append('price', this.validateForm.get('price')?.value);

      this.companyService.updateAd(this.adId,formData).subscribe(res => {
        this.notification.success('Success', `Ad updated successfully`, {nzDuration: 5000});
        this.router.navigateByUrl('company/ads');
      }, error => {
        this.notification.error('ERROR', `${error.error}`, {nzDuration: 5000});
      })

    }



}
