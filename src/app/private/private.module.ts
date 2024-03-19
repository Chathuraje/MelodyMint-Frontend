import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { Paths } from '../@application/enums/paths';
import { FundRaisersComponent } from './fund-raisers/fund-raisers.component';
import { ViewFundRaisersComponent } from './fund-raisers/view-fund-raisers/view-fund-raisers.component';
import { MusicTracerComponent } from './music-tracer/music-tracer.component';
import { ViewSingleMusicTrackComponent } from './music-tracer/view-single-music-track/view-single-music-track.component';
import { AddMusicTracerDialogBoxComponent } from './music-tracer/add-music-tracer-dialog-box/add-music-tracer-dialog-box.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { SingleMarketPlaceComponent } from './market-place/single-market-place/single-market-place.component';
import { SingleMusicItemComponent } from './market-place/single-market-place/single-music-item/single-music-item.component';
import { ViewRecordsDialogBoxComponent } from './music-tracer/view-single-music-track/view-records-dialog-box/view-records-dialog-box.component';
import { HomeComponent } from './home/home.component';
import { HomeNavbarComponent } from './home/home-navbar/home-navbar.component';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children:[
      {
        path: Paths.FundRaise, component: FundRaisersComponent,
      },
      {
        path: Paths.ViewFundRaise, component: ViewFundRaisersComponent,
      },
      {
        path: Paths.ViewMusicTracer, component: MusicTracerComponent,
      },
      {
        path: Paths.ViewSingleMusicTrack, component: ViewSingleMusicTrackComponent,
      },
      {
        path: Paths.MarketPlace, component: MarketPlaceComponent,
      },
      {
        path: Paths.SingleMarketPlace, component: SingleMarketPlaceComponent,
      },
      {
        path: Paths.SingleMusicItem, component: SingleMusicItemComponent,
      }
    ]
  },

]

@NgModule({
  declarations: [
    FundRaisersComponent,
    ViewFundRaisersComponent,
    MusicTracerComponent,
    ViewSingleMusicTrackComponent,
    AddMusicTracerDialogBoxComponent,
    MarketPlaceComponent,
    SingleMarketPlaceComponent,
    SingleMusicItemComponent,
    ViewRecordsDialogBoxComponent,
    HomeComponent,
    HomeNavbarComponent,
    HomeFooterComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    ReactiveFormsModule,


  ]
})
export class PrivateModule { }
