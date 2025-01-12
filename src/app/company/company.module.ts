import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { SignupClientComponent } from './pages/signup-client/signup-client.component';


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDashboardComponent,
    SignupClientComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
