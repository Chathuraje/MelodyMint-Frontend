import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicCollection } from '../single-market-place.component';

@Component({
  selector: 'app-single-music-item',
  templateUrl: './single-music-item.component.html',
  styleUrls: ['./single-music-item.component.scss']
})
export class SingleMusicItemComponent {

  musicCollection = {} as MusicCollection

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['musicCollection']) {
        this.musicCollection = JSON.parse(params['musicCollection']);
        console.log(this.musicCollection);
      }
    });
  }

}
