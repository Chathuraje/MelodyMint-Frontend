import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewRecordsDialogBoxComponent } from './view-records-dialog-box/view-records-dialog-box.component';

@Component({
  selector: 'app-view-single-music-track',
  templateUrl: './view-single-music-track.component.html',
  styleUrls: ['./view-single-music-track.component.scss']
})
export class ViewSingleMusicTrackComponent {

  musicTracer = {} as SingleMusicTrack

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['musicTracer']) {
        this.musicTracer = JSON.parse(params['musicTracer']);
      }
    });
  }

  onRecords(records: Record[], platform_name: string): void {
    const dialogRef = this.dialog.open(ViewRecordsDialogBoxComponent, {
      width: '50%',
      data: {
        records: records,
        title: platform_name
      }
    });

  }

}
export interface SingleMusicTrack {
  id: string
  title: string
  user_id: string
  type: string
  total_stream: number
  total_platform: number
  total_time: number
  platform_details: PlatformDetail[]
}

export interface PlatformDetail {
  platform_name: string
  stream_count: number
  records: Record[]
}

export interface Record {
  date: string
  time: string
  duration: string
}



