import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent {

  marketPlaces = [] as MarketPlace[]

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.getMarketPlaceData();
  }


  showMarketPlaceDetails(marketPlace: MarketPlace) {
    console.log(marketPlace);

    this.router.navigate(['/single-market-place'], { queryParams: { marketPlace: JSON.stringify(marketPlace) } });
  }





  getMarketPlaceData(): void {
    this.http.get<any>('http://127.0.0.1:1998/api/marketplace/').subscribe({
      next: (value: any) => {
        this.marketPlaces = value.data
        console.log(this.marketPlaces);
      },
      error: (error: any) => {
        console.error('Error fetching fund raisers data:', error);
      }
    });
  }



}

export interface Root {
  code: number
  response: string
  data: MarketPlace[]
}

export interface MarketPlace {
  name: string
  description: string
  owner_id: string
  campaign_id: string
  id: string
  owner_name: string
  floor: string
  volume: string
}
