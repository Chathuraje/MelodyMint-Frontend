import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketPlace } from '../market-place.component';

@Component({
  selector: 'app-single-market-place',
  templateUrl: './single-market-place.component.html',
  styleUrls: ['./single-market-place.component.scss']
})
export class SingleMarketPlaceComponent {

  musicCollection = [] as MusicCollection[]
  marketPlaces = {} as MarketPlace

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['marketPlace']) {
        this.marketPlaces = JSON.parse(params['marketPlace']);
        console.log(this.marketPlaces);
      }
    });
    if (this.marketPlaces.id) {
      this.getMusicCollectionData(this.marketPlaces.id);
    }
  }


  showMusicDetails(musicCollection: MusicCollection) {
    this.router.navigate(['/single-music-item'], { queryParams: { musicCollection: JSON.stringify(musicCollection) } });
  }

  getMusicCollectionData(marketPlacesId: string) {
    console.log(marketPlacesId);

    this.http.get<Root>('https://api.melodymint.digitix365.com/api/marketplace/' + marketPlacesId + '/nfts').subscribe({
      next: (value: Root) => {
        this.musicCollection = value.data;
        console.log(this.musicCollection);
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
  data: MusicCollection[]
}

export interface MusicCollection {
  collection_id: string
  token_name: string
  token_description: string
  image: string
  owner_id: string
  current_owner_id: string
  creation_date: string
  royalties: string
  price: string
  status: string
  id: string
}

