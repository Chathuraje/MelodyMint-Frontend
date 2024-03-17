import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Paths } from '../@application/enums/paths';
import { RegistrationLayoutComponent } from './registration-layout/registration-layout.component';
import { InvestorRegistrationFormComponent } from './containers/investor-registration-form/investor-registration-form.component';
import { SharedModule } from '../shared/shared.module';
import { ArtistRegistrationFormComponent } from './containers/artist-registration-form/artist-registration-form.component';
import { FundRaiseFormComponent } from './containers/artist-registration-form/fund-raise-form/fund-raise-form.component';
import { FundRaisersComponent } from '../private/fund-raisers/fund-raisers.component';
import { ChunkPipe } from '../@application/pipes/chunk.pipe';
import { ViewFundRaisersComponent } from '../private/fund-raisers/view-fund-raisers/view-fund-raisers.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
  },
  {
    path: Paths.Registration, component: RegistrationLayoutComponent,
  },
  {
    path: Paths.InvestorRegistration, component: InvestorRegistrationFormComponent,
  },
  {
    path: Paths.ArtistRegistration, component: ArtistRegistrationFormComponent,
  },
  {
    path: Paths.CreateFundRaise, component: FundRaiseFormComponent,
  },
  {
    path: Paths.FundRaise, component: FundRaisersComponent,
  },
  {
    path: Paths.ViewFundRaise, component: ViewFundRaisersComponent,
  }


]


@NgModule({
  declarations: [
    LandingPageComponent,
    RegistrationLayoutComponent,
    InvestorRegistrationFormComponent,
    ArtistRegistrationFormComponent,
    FundRaiseFormComponent,
    FundRaisersComponent,
    ViewFundRaisersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
